'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Phone } from './Icons';
import estimatorData from '@/lib/estimator-data.json';
import { site } from '@/lib/site';

type Category = { key: string; label: string; from?: number; low: number | null; high: number | null; note: string };
type Estimate = {
  category: string | null;
  label: string | null;
  from: number | null;
  low: number | null;
  high: number | null;
  note: string;
  disclaimer: string;
  source: 'live' | 'default';
  basis?: { level: 'category' | 'make' | 'model'; sampleSize?: number };
};

const CATEGORIES = estimatorData.categories as Category[];
const STEPS = ['Votre besoin', 'Votre véhicule', 'Vos coordonnées'];

const field =
  'w-full rounded-[10px] border-[1.5px] border-line bg-white px-3 py-2.5 text-[14.5px] text-ink outline-none transition focus:border-red focus:ring-2 focus:ring-red-wash';
const label = 'mb-1 block text-[12.5px] font-bold text-ink';

/** Carte d'estimation. `aria-live` pour que le lecteur d'écran annonce la fourchette. */
function EstimateCard({
  est,
  loading,
  make,
  model,
}: {
  est: Estimate | null;
  loading: boolean;
  make?: string;
  model?: string;
}) {
  // « Affinée » seulement si Lemonauto a vraiment calculé sur le véhicule.
  // Le repli statique ne connaît que la catégorie : on n'en fait pas une personnalisation.
  const refined =
    est?.source === 'live' && (est.basis?.level === 'make' || est.basis?.level === 'model');
  const vehicle = [make?.trim(), model?.trim()].filter(Boolean).join(' ');
  // Une estimation déjà affichée n'est pas remplacée par le loader : on l'affine sur place.
  const firstLoad = loading && !est;

  return (
    <div aria-live="polite" className="min-h-[1px]">
      {firstLoad && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-line bg-wash px-4 py-3.5 text-[13.5px] text-mut">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-red" aria-hidden />
          Calcul de votre estimation…
        </div>
      )}

      {!firstLoad && est && est.low !== null && est.high !== null && (
        <div className="mt-4 animate-fadeUp rounded-xl border border-[#f2c9ce] bg-red-wash p-4">
          <div className="flex items-center gap-2">
            <p className="text-[12px] font-extrabold uppercase tracking-wide text-red">
              {refined ? 'Estimation affinée' : 'Estimation indicative'}
            </p>
            {loading && (
              <span
                className="h-3 w-3 animate-spin rounded-full border-2 border-[#f2c9ce] border-t-red"
                aria-label="Affinage en cours"
              />
            )}
          </div>
          <p className="mt-1.5 text-[22px] font-extrabold leading-tight text-ink">
            entre {est.low} et {est.high} €
          </p>
          {est.from != null && <p className="mt-0.5 text-[13.5px] font-bold text-red">dès {est.from} €</p>}
          {refined && vehicle && (
            <p className="mt-1 text-[13px] font-semibold text-body">
              Pour votre {vehicle}
              {est.basis?.sampleSize ? ` — basée sur ${est.basis.sampleSize} véhicules similaires` : ''}
            </p>
          )}
          {est.note && <p className="mt-1 text-[13px] text-body">{est.note}</p>}
          <p className="mt-2.5 border-t border-[#f2c9ce] pt-2.5 text-[11.5px] leading-snug text-mut">
            {est.disclaimer}
          </p>
        </div>
      )}

      {!firstLoad && est && (est.low === null || est.high === null) && (
        <div className="mt-4 animate-fadeUp rounded-xl border border-line bg-wash p-4">
          <p className="text-[13.5px] font-bold text-ink">Estimation après description</p>
          <p className="mt-1 text-[13px] text-body">
            Votre besoin sort des forfaits courants : décrivez-le et nous chiffrons précisément après le contrôle gratuit.
          </p>
        </div>
      )}
    </div>
  );
}

export default function DevisForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const [category, setCategory] = useState('');
  const [freetext, setFreetext] = useState('');
  const [est, setEst] = useState<Estimate | null>(null);
  const [estLoading, setEstLoading] = useState(false);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');

  const headingRef = useRef<HTMLParagraphElement>(null);
  const firstRender = useRef(true);
  /** Numéro de la dernière requête d'estimation : évite qu'une réponse tardive écrase une plus récente. */
  const reqId = useRef(0);

  const runEstimate = useCallback(
    async (payload: { category?: string; freetext?: string; vehicle?: unknown }) => {
      const id = ++reqId.current;
      setEstLoading(true);
      try {
        const r = await fetch('/api/estimate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = (await r.json()) as Estimate;
        if (id === reqId.current) setEst(data);
      } catch {
        if (id === reqId.current) setEst(null);
      } finally {
        if (id === reqId.current) setEstLoading(false);
      }
    },
    []
  );

  // Déplacer le focus sur le titre d'étape : sans ça, le clavier reste au bouton précédent.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function pick(key: string) {
    setCategory(key);
    setEst(null);
    if (key !== 'autre') runEstimate({ category: key });
  }

  const isAutre = category === 'autre';
  const canLeaveStep0 = category !== '' && (!isAutre || freetext.trim().length >= 3);

  // Affinage par véhicule : dès que la marque ou le modèle est saisi à l'étape 2,
  // on redemande une fourchette calculée sur ce véhicule précis.
  // Débounce à 500 ms pour ne pas tirer une requête par frappe ; les réponses
  // tardives sont neutralisées par le compteur dans runEstimate.
  useEffect(() => {
    if (step !== 1 || !category || isAutre) return;
    if (!make.trim() && !model.trim()) return;
    const t = setTimeout(() => {
      runEstimate({ category, vehicle: { make: make.trim(), model: model.trim() } });
    }, 500);
    return () => clearTimeout(t);
  }, [step, category, isAutre, make, model, runEstimate]);

  function next() {
    if (step === 0 && !canLeaveStep0) return;
    setStep((s) => Math.min(2, s + 1));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const catLabel = CATEGORIES.find((c) => c.key === category)?.label ?? '';
    const payload = {
      clientName: String(fd.get('clientName') || ''),
      clientPhone: String(fd.get('clientPhone') || ''),
      clientEmail: String(fd.get('clientEmail') || ''),
      vehicle: { make, model, plateNumber: plate },
      message: [catLabel, freetext.trim()].filter(Boolean).join(' — '),
      // Pré-qualification : la demande arrive catégorisée et chiffrée côté Lemonauto.
      category: category || null,
      estimateLow: est?.low ?? null,
      estimateHigh: est?.high ?? null,
      website: String(fd.get('website') || ''), // honeypot
    };
    try {
      const r = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(r.ok ? 'ok' : 'err');
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="animate-fadeUp rounded-[18px] bg-white p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,.3)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-wash text-red">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-ink">Demande envoyée !</h3>
        <p className="text-body">On vous rappelle sous 24h ouvrées. Merci de votre confiance.</p>
        {est?.low != null && est.high != null && (
          <p className="mt-3 text-[13px] text-mut">
            Estimation retenue : entre {est.low} et {est.high} €. Le devis définitif sera établi après le contrôle gratuit.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[18px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,.3)]">
      {/* Progression */}
      <div className="mb-5">
        <div className="mb-2 flex items-baseline justify-between">
          <p ref={headingRef} tabIndex={-1} className="text-[15px] font-extrabold text-ink outline-none">
            {STEPS[step]}
          </p>
          <p className="text-[12px] font-bold text-mut">Étape {step + 1} / 3</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-red transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Étape 1 : besoin ── */}
      {step === 0 && (
        <div key="s0" className="animate-fadeUp">
          <fieldset>
            <legend className={label}>De quoi votre véhicule a-t-il besoin ?</legend>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = category === c.key;
                return (
                  <label
                    key={c.key}
                    className={`cursor-pointer rounded-full border-[1.5px] px-3 py-2 text-[13px] font-semibold transition focus-within:ring-2 focus-within:ring-red-wash ${
                      on ? 'border-red bg-red text-white' : 'border-line bg-white text-body hover:border-red hover:text-red'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={c.key}
                      checked={on}
                      onChange={() => pick(c.key)}
                      className="sr-only"
                    />
                    {c.label}
                  </label>
                );
              })}
            </div>
          </fieldset>

          {isAutre && (
            <div className="mt-4 animate-fadeUp">
              <label className={label} htmlFor="freetext">
                Décrivez votre problème
              </label>
              <textarea
                id="freetext"
                rows={3}
                value={freetext}
                onChange={(e) => setFreetext(e.target.value)}
                onBlur={() => freetext.trim().length >= 3 && runEstimate({ category: 'autre', freetext })}
                placeholder="Ex : bruit de claquement à froid côté avant droit"
                className={field}
              />
            </div>
          )}

          <EstimateCard est={est} loading={estLoading} />
        </div>
      )}

      {/* ── Étape 2 : véhicule ── */}
      {step === 1 && (
        <div key="s1" className="animate-fadeUp">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="make">Marque</label>
              <input id="make" value={make} onChange={(e) => setMake(e.target.value)} placeholder="Ex : Peugeot" className={field} />
            </div>
            <div>
              <label className={label} htmlFor="model">Modèle</label>
              <input id="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Ex : 208" className={field} />
            </div>
          </div>
          <div className="mt-3">
            <label className={label} htmlFor="plate">
              Immatriculation <span className="font-normal text-mut">(optionnel)</span>
            </label>
            <input id="plate" value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="AA-123-AA" className={field} />
          </div>
          <EstimateCard est={est} loading={estLoading} make={make} model={model} />
        </div>
      )}

      {/* ── Étape 3 : contact ── */}
      {step === 2 && (
        <div key="s2" className="animate-fadeUp">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="clientName">Nom</label>
              <input id="clientName" name="clientName" required placeholder="Votre nom" className={field} />
            </div>
            <div>
              <label className={label} htmlFor="clientPhone">Téléphone</label>
              <input id="clientPhone" name="clientPhone" required type="tel" placeholder="06 __ __ __ __" className={field} />
            </div>
          </div>
          <div className="mt-3">
            <label className={label} htmlFor="clientEmail">
              Email <span className="font-normal text-mut">(optionnel)</span>
            </label>
            <input id="clientEmail" name="clientEmail" type="email" placeholder="vous@email.fr" className={field} />
          </div>
          <EstimateCard est={est} loading={estLoading} make={make} model={model} />
        </div>
      )}

      {/* honeypot anti-spam (caché) */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {/* Navigation */}
      <div className="mt-5 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-full border-[1.5px] border-line px-4 py-3 text-sm font-bold text-body transition hover:border-red hover:text-red"
          >
            Retour
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            disabled={step === 0 && !canLeaveStep0}
            className="flex-1 rounded-full bg-red px-4 py-3.5 text-base font-bold text-white transition hover:bg-red-dark disabled:opacity-50"
          >
            Continuer
          </button>
        ) : (
          <button
            disabled={status === 'sending'}
            className="flex-1 rounded-full bg-red px-4 py-3.5 text-base font-bold text-white transition hover:bg-red-dark disabled:opacity-60"
          >
            {status === 'sending' ? 'Envoi…' : 'Recevez le devis exact'}
          </button>
        )}
      </div>

      {status === 'err' && (
        <p className="mt-2 text-center text-sm font-semibold text-red">
          Une erreur est survenue. Appelez-nous au {site.phone}.
        </p>
      )}

      <a
        href={site.phoneHref}
        className="mt-3 flex items-center justify-center gap-2 text-[13px] font-semibold text-body transition hover:text-red"
      >
        <Phone className="h-4 w-4" /> Ou appelez-nous au {site.phone}
      </a>

      <p className="mt-3 text-center text-[11.5px] text-mut">
        En envoyant, vous acceptez d’être recontacté par le garage. Vos données ne sont jamais revendues.
      </p>
    </form>
  );
}
