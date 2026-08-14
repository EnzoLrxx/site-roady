'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { offers, type Offer } from '@/lib/site';
import { Check } from './Icons';
import Reveal from './Reveal';

/** Comparateur avant/après : la photo « après » est révélée depuis la gauche. */
export function Compare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    // L'« après » est l'image de fond et l'« avant » la recouvre depuis la gauche :
    // on lit donc avant → après de gauche à droite, dans le sens de lecture.
    <div className="relative select-none overflow-hidden rounded-2xl bg-navy">
      <img src={after} alt="Le même phare après rénovation, redevenu transparent" className="block w-full" />
      <img
        src={before}
        alt="Phare oxydé avant rénovation"
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[13px] font-black text-navy shadow-lg">
          ↔
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        Avant
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        Après
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparer l’avant et l’après de la rénovation du phare"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/**
 * Ossature commune à toutes les cartes, sans aucun visuel : c'est la seule façon de
 * garantir des hauteurs identiques. Le comparateur, qui déséquilibrait la carte
 * phares, a sa propre section — il mérite mieux qu'une vignette de 250 px.
 * Les zones titre et prix ont une hauteur plancher pour aligner les prix entre elles.
 */
function Card({ o }: { o: Offer }) {
  return (
    <article className="flex min-w-[270px] max-w-[270px] snap-start flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_2px_14px_rgba(14,27,44,.05)] transition hover:-translate-y-1 hover:border-[#f2c9ce] hover:shadow-[0_10px_32px_rgba(14,27,44,.12)] sm:min-w-[300px] sm:max-w-[300px] lg:min-w-[calc((100%-60px)/4)] lg:max-w-[calc((100%-60px)/4)]">
      <div className="mb-4">
        <span className="inline-block rounded-full bg-red-wash px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red">
          {o.tag}
        </span>
      </div>

      {/* Hauteur FIXE, pas un plancher : c'est ce qui met les prix des quatre cartes
          sur la même ligne, quel que soit le nombre de lignes du titre. */}
      <div className="h-[84px]">
        <h3 className="line-clamp-2 text-[19px] font-extrabold leading-tight text-ink">{o.title}</h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-mut">{o.subtitle}</p>
      </div>

      <div className="my-4 flex min-h-[56px] items-center border-t border-line pt-4">
        {o.price ? (
          <p className="flex items-baseline gap-1">
            <span className="text-[42px] font-extrabold leading-none tracking-tight text-red">{o.price}</span>
            <span className="text-[15px] font-bold text-red">{o.unit}</span>
          </p>
        ) : (
          <p className="text-[18px] font-extrabold leading-snug text-red">{o.headline}</p>
        )}
      </div>

      <ul className="space-y-2">
        {o.points.map((p) => (
          <li key={p} className="flex gap-2 text-[13.5px] leading-snug text-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-red" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Offres() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [ends, setEnds] = useState({ start: true, end: false });
  const [scrollable, setScrollable] = useState(false);

  const phares = offers.find((o) => o.kind === 'compare');

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = el.scrollWidth / offers.length;
    setActive(Math.min(offers.length - 1, Math.round(el.scrollLeft / step)));
    setScrollable(el.scrollWidth > el.clientWidth + 4);
    setEnds({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
    });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const go = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const arrow =
    'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:border-red hover:text-red disabled:cursor-default disabled:opacity-35 disabled:hover:border-line disabled:hover:text-navy';

  return (
    <section id="offres" className="bg-wash py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">
                Nos offres du moment
              </span>
              <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">
                Des forfaits clairs, affichés sans surprise
              </h2>
              <p className="text-[17px] text-body">
                Le prix annoncé est le prix payé. Pour en profiter, passez au centre ou demandez votre devis en ligne.
              </p>
            </div>
            {/* Flèches inutiles quand les 4 cartes tiennent à l'écran */}
            {scrollable && (
              <div className="hidden gap-2 sm:flex">
                <button type="button" onClick={() => go(-1)} disabled={ends.start} aria-label="Offres précédentes" className={arrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button type="button" onClick={() => go(1)} disabled={ends.end} aria-label="Offres suivantes" className={arrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* items-stretch (défaut) égalise les hauteurs ; surtout ne pas remettre h-full
            sur les cartes, il résout contre une hauteur auto et casse l'égalisation. */}
        <div
          ref={track}
          onScroll={sync}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2"
        >
          {offers.map((o) => (
            <Card key={o.id} o={o} />
          ))}
        </div>

        {scrollable && (
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden>
            {offers.map((o, i) => (
              <span
                key={o.id}
                className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-red' : 'w-1.5 bg-line'}`}
              />
            ))}
          </div>
        )}

        {/* ── Preuve en images : la rénovation de phares ── */}
        {phares?.before && phares.after && (
          <Reveal>
            <div className="mt-14 grid grid-cols-1 items-center gap-8 rounded-2xl border border-line bg-white p-6 sm:p-9 md:grid-cols-2 md:gap-12">
              <div>
                <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">
                  La preuve en images
                </span>
                <h3 className="mb-3 mt-3 text-[26px] font-extrabold leading-tight tracking-tight text-ink">
                  Vos phares opaques redeviennent transparents
                </h3>
                <p className="mb-4 text-[15.5px] leading-relaxed text-body">
                  Le soleil et les UV oxydent le plastique de vos optiques jour après jour. Au-delà de l’aspect,
                  vous perdez en capacité d’éclairage — et <strong className="font-bold text-ink">plus de 10 % des
                  refus au contrôle technique</strong> viennent de l’état des phares.
                </p>
                <p className="mb-5 text-[14px] text-mut">
                  Tirez le curseur sur la photo : c’est un phare réellement traité dans notre atelier.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="flex items-baseline gap-1">
                    <span className="text-[38px] font-extrabold leading-none tracking-tight text-red">39</span>
                    <span className="text-[15px] font-bold text-red">€ / phare</span>
                  </p>
                  <a
                    href="#contact"
                    className="rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-3"
                  >
                    Faire rénover mes phares
                  </a>
                </div>
              </div>
              <Compare before={phares.before} after={phares.after} />
            </div>
          </Reveal>
        )}

        {/* Un seul appel à l'action pour tout le bloc : répété sur chaque carte,
            il perdait son poids et alourdissait la lecture. */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#contact"
            className="rounded-full bg-red px-7 py-3.5 text-base font-bold text-white transition hover:bg-red-dark"
          >
            Demander un devis gratuit
          </a>
          <p className="text-center text-[12px] text-mut">
            Offres valables en centre Roady Solliès-Pont. Voir conditions en magasin ou au{' '}
            <a href="tel:+33494288142" className="font-semibold text-body underline underline-offset-2">04 94 28 81 42</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
