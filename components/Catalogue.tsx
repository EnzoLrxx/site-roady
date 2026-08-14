'use client';
import { useEffect, useMemo, useState } from 'react';
import { prestations, boutique, prix, totalPrestations, totalReferences, populaires, MENTION_PRIX } from '@/lib/catalogue';
import { site, brands } from '@/lib/site';
import { ServiceIcon, Check, Phone } from './Icons';
import Reveal from './Reveal';

/** Icône associée à chaque catégorie de prestation, par mot-clé du nom. */
const ICONES: [RegExp, string][] = [
  [/entretien|vidange/i, 'oil'],
  [/pneu/i, 'tire'],
  [/frein/i, 'brake'],
  [/clim/i, 'ac'],
  [/distribution|moteur/i, 'belt'],
  [/diagnostic|électric/i, 'diag'],
  [/boîte/i, 'engine'],
  [/éthanol|reprogram/i, 'engine'],
  [/batterie/i, 'battery'],
];
const icone = (nom: string) => ICONES.find(([re]) => re.test(nom))?.[1] ?? 'diag';

function normalise(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function Catalogue() {
  const [onglet, setOnglet] = useState<'prestations' | 'boutique'>('prestations');
  const [ouverte, setOuverte] = useState<string | null>(null);
  const [q, setQ] = useState('');

  // Les vignettes de la boutique, sur l'accueil, pointent vers /catalogue#boutique
  // (voire #boutique-batteries). On ouvre le bon onglet et on descend dessus.
  // Choix de l'ancre plutôt que d'un paramètre d'URL : ça garde la page statique.
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.replace('#', ''));
    if (!h.startsWith('boutique')) return;
    setOnglet('boutique');
    const cible = h.slice('boutique'.length).replace(/^-/, '');
    if (cible) {
      // Laisser React peindre l'onglet avant de chercher l'élément.
      requestAnimationFrame(() => {
        document.getElementById(`b-${cible}`)?.scrollIntoView({ block: 'center' });
      });
    }
  }, []);

  const recherche = normalise(q.trim());

  // La recherche traverse les deux univers : en borne, le client ne sait pas
  // dans quel onglet se trouve ce qu'il cherche.
  const resultats = useMemo(() => {
    if (recherche.length < 2) return null;
    const p = prestations
      .map((c) => ({ ...c, items: c.items.filter((i) => normalise(i.label).includes(recherche)) }))
      .filter((c) => c.items.length > 0);
    const b = boutique.filter(
      (c) => normalise(c.nom).includes(recherche) || normalise(c.desc).includes(recherche)
    );
    return { p, b, total: p.reduce((n, c) => n + c.items.length, 0) + b.length };
  }, [recherche]);

  const onglets = [
    { id: 'prestations' as const, label: 'Nos prestations', n: `${totalPrestations} forfaits` },
    { id: 'boutique' as const, label: 'La boutique', n: `${totalReferences} références` },
  ];

  return (
    <>
      {/* ── En-tête ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-3 py-14 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(700px 340px at 85% -20%, rgba(226,0,26,.45), transparent 62%)' }}
        />
        <div className="relative mx-auto max-w-6xl px-5">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ffd0d5]">
            Catalogue &amp; tarifs
          </span>
          <h1 className="mb-3 mt-3 text-[38px] font-extrabold leading-tight tracking-tight sm:text-[46px]">
            Tout ce qu’on fait, tout ce qu’on vend.
          </h1>
          <p className="mb-7 max-w-2xl text-[17px] text-white/90">
            Nos {totalPrestations} forfaits atelier avec leurs prix TTC, et les {totalReferences} références
            passées au comptoir cette année. Prix affichés, pas de surprise.
          </p>

          <label className="relative block max-w-xl">
            <span className="sr-only">Rechercher une prestation ou un produit</span>
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mut"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher : vidange, plaquettes, clim, attelage…"
              className="w-full rounded-full border-[1.5px] border-white/20 bg-white py-4 pl-12 pr-4 text-[15.5px] text-ink outline-none transition focus:border-red focus:ring-4 focus:ring-red/25"
            />
          </label>
        </div>
      </section>

      <section className="bg-wash py-12">
        <div className="mx-auto max-w-6xl px-5">
          {/* ── Résultats de recherche ── */}
          {resultats && (
            <div className="animate-fadeUp">
              <p className="mb-6 text-[15px] font-bold text-ink">
                {resultats.total === 0
                  ? <>Aucun résultat pour « {q} ». Appelez-nous, on a sûrement ce qu’il vous faut.</>
                  : <>{resultats.total} résultat{resultats.total > 1 ? 's' : ''} pour « {q} »</>}
              </p>

              {resultats.p.map((c) => (
                <div key={c.nom} className="mb-5 overflow-hidden rounded-2xl border border-line bg-white">
                  <p className="border-b border-line bg-wash px-5 py-3 text-[13px] font-extrabold uppercase tracking-wide text-mut">
                    {c.nom}
                  </p>
                  <Liste items={c.items} />
                </div>
              ))}

              {resultats.b.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {resultats.b.map((c) => <TuileBoutique key={c.nom} c={c} />)}
                </div>
              )}
            </div>
          )}

          {/* ── Navigation par onglets ── */}
          {!resultats && (
            <>
              <div className="mb-8 inline-flex rounded-full border border-line bg-white p-1.5" role="tablist">
                {onglets.map((o) => (
                  <button
                    key={o.id}
                    role="tab"
                    aria-selected={onglet === o.id}
                    onClick={() => { setOnglet(o.id); setOuverte(null); }}
                    className={`rounded-full px-6 py-3 text-[15px] font-bold transition ${
                      onglet === o.id ? 'bg-red text-white' : 'text-body hover:text-red'
                    }`}
                  >
                    {o.label}
                    <span className={`ml-2 text-[12.5px] font-semibold ${onglet === o.id ? 'text-white/75' : 'text-mut'}`}>
                      {o.n}
                    </span>
                  </button>
                ))}
              </div>

              {onglet === 'prestations' && (
                <>
                  {/* Ce que les clients demandent réellement — issu des volumes de vente,
                      pas d'une sélection éditoriale. */}
                  <Reveal>
                    <div className="mb-8 rounded-2xl border border-line bg-white p-6 sm:p-7">
                      <h2 className="text-[19px] font-extrabold text-ink">Les forfaits les plus demandés</h2>
                      <p className="mt-1 text-[14px] text-mut">Ce que nos clients nous confient le plus souvent cette année.</p>
                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {populaires.map((it) => (
                          <div key={it.designation} className="flex items-center justify-between gap-3 rounded-xl bg-wash px-4 py-3.5">
                            <span className="min-w-0">
                              <span className="block truncate text-[14px] font-bold text-ink">{it.label}</span>
                              <span className="text-[12px] text-mut">{it.categorie}</span>
                            </span>
                            <span className="shrink-0 text-[15px] font-extrabold text-red">{prix(it.prix_ttc)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {prestations.map((c, i) => {
                    const open = ouverte === c.nom;
                    return (
                      <Reveal key={c.nom} delay={(i % 4) * 50}>
                        <div className={`overflow-hidden rounded-2xl border bg-white transition ${open ? 'border-red shadow-[0_10px_32px_rgba(14,27,44,.12)]' : 'border-line'}`}>
                          <button
                            onClick={() => setOuverte(open ? null : c.nom)}
                            aria-expanded={open}
                            className="flex w-full items-center gap-4 px-5 py-5 text-left"
                          >
                            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${open ? 'bg-red text-white' : 'bg-red-wash text-red'}`}>
                              <ServiceIcon name={icone(c.nom)} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[17px] font-extrabold leading-tight text-ink">{c.nom}</span>
                              <span className="mt-0.5 block text-[13px] text-mut">
                                {c.items.length} forfait{c.items.length > 1 ? 's' : ''} · dès {prix(c.aPartirDe)}
                              </span>
                            </span>
                            <span className={`shrink-0 text-red transition ${open ? 'rotate-45' : ''}`}>
                              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 6v12M6 12h12" /></svg>
                            </span>
                          </button>
                          <div className={`acc-panel ${open ? 'open' : ''}`}>
                            <div><Liste items={c.items} /></div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
                </>
              )}

              {onglet === 'boutique' && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {boutique.map((c, i) => (
                      <Reveal key={c.nom} delay={(i % 3) * 50}><TuileBoutique c={c} /></Reveal>
                    ))}
                  </div>

                  <Reveal>
                    <div className="mt-10 rounded-2xl border border-line bg-white p-7">
                      <h2 className="text-[19px] font-extrabold text-ink">Les marques que nous distribuons</h2>
                      <p className="mt-1.5 text-[14.5px] text-body">
                        Des références de première monte, pas de sous-marque.
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        {brands.map((b) => (
                          <span key={b.name} className="flex h-16 w-32 items-center justify-center rounded-xl border border-line bg-white px-4">
                            <img src={b.logo} alt={b.name} className="max-h-9 max-w-[100px] object-contain" loading="lazy" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </>
              )}
            </>
          )}

          {/* ── Appel à l'action, toujours visible ── */}
          <Reveal>
            <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-navy to-navy-3 p-9 text-center text-white">
              <h2 className="text-[24px] font-extrabold tracking-tight">Votre véhicule n’est pas dans la liste ?</h2>
              <p className="max-w-xl text-[15.5px] text-white/90">
                Ces prix sont des forfaits standards. Pour un chiffrage exact sur votre voiture,
                demandez un devis — c’est gratuit et sans engagement.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/#contact" className="rounded-full bg-red px-7 py-4 text-base font-bold text-white transition hover:bg-red-dark">
                  Demander un devis gratuit
                </a>
                <a href={site.phoneHref} className="flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-white/10 px-6 py-4 text-base font-bold text-white transition hover:bg-white/20">
                  <Phone className="h-[18px] w-[18px]" /> {site.phone}
                </a>
              </div>
              <p className="text-[12.5px] text-white/70">
                Prix TTC, pièces comprises sauf mention contraire. Tarifs valables en centre Roady Solliès-Pont.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Liste({ items }: { items: { designation: string; label: string; prix_ttc: number }[] }) {
  return (
    <>
    <ul className="divide-y divide-line">
      {items.map((it) => (
        <li key={it.designation + it.prix_ttc} className="flex items-center justify-between gap-4 px-5 py-3.5">
          <span className="text-[14.5px] leading-snug text-body">{it.label}</span>
          <span className="shrink-0 text-[15px] font-extrabold text-ink">{prix(it.prix_ttc)}</span>
        </li>
      ))}
    </ul>
    {/* Une condition à côté de chaque prix : le forfait est réel, mais il dépend du véhicule. */}
    <p className="border-t border-line bg-wash px-5 py-3 text-[12px] leading-snug text-mut">{MENTION_PRIX}</p>
    </>
  );
}

function TuileBoutique({ c }: { c: { nom: string; slug: string; nbReferences: number; desc: string; marques: string[]; icon: string } }) {
  return (
    <div id={`b-${c.slug}`} className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-[#f2c9ce] hover:shadow-[0_10px_32px_rgba(14,27,44,.12)]">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-wash text-red">
        <ServiceIcon name={c.icon} />
      </span>
      <h3 className="text-[17.5px] font-extrabold leading-tight text-ink">{c.nom}</h3>
      <p className="mt-1 text-[26px] font-extrabold leading-none tracking-tight text-red">
        {c.nbReferences}
        <span className="ml-1.5 text-[13px] font-bold text-mut">
          référence{c.nbReferences > 1 ? 's' : ''} vendues en 2026
        </span>
      </p>
      <p className="mt-3 flex-1 text-[14px] leading-relaxed text-body">{c.desc}</p>
      {c.marques.length > 0 && (
        <p className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line pt-3">
          {c.marques.map((m) => (
            <span key={m} className="rounded-full bg-wash px-2.5 py-1 text-[12px] font-bold text-body">{m}</span>
          ))}
        </p>
      )}
    </div>
  );
}
