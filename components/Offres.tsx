'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { offers, type Offer } from '@/lib/site';
import { ServiceIcon, Check } from './Icons';
import Reveal from './Reveal';

/** Comparateur avant/après : la photo « après » est révélée depuis la gauche. */
function Compare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative select-none overflow-hidden rounded-xl bg-navy">
      <img src={before} alt="Phare oxydé avant rénovation" className="block w-full" />
      <img
        src={after}
        alt="Phare après rénovation"
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      {/* Trait de séparation */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[11px] font-black text-navy shadow-md">
          ↔
        </span>
      </div>
      <span className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Après
      </span>
      <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
        Avant
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Comparer avant et après rénovation du phare"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function Card({ o }: { o: Offer }) {
  return (
    <article className="flex h-full min-w-[286px] max-w-[286px] snap-start flex-col rounded-2xl border border-line bg-white p-6 shadow-[0_2px_14px_rgba(14,27,44,.05)] transition hover:-translate-y-1 hover:border-[#f2c9ce] hover:shadow-[0_10px_32px_rgba(14,27,44,.12)] sm:min-w-[320px] sm:max-w-[320px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-red-wash px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red">
          {o.tag}
        </span>
        {o.icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wash text-navy">
            <ServiceIcon name={o.icon} />
          </span>
        )}
      </div>

      {o.kind === 'compare' && o.before && o.after && (
        <div className="mb-4">
          <Compare before={o.before} after={o.after} />
        </div>
      )}

      <h3 className="text-[19px] font-extrabold leading-tight text-ink">{o.title}</h3>
      <p className="mt-1 text-[13px] text-mut">{o.subtitle}</p>

      <div className="my-4 border-t border-line pt-4">
        {o.price ? (
          <p className="flex items-baseline gap-1">
            <span className="text-[42px] font-extrabold leading-none tracking-tight text-red">{o.price}</span>
            <span className="text-[15px] font-bold text-red">{o.unit}</span>
          </p>
        ) : (
          <p className="text-[19px] font-extrabold leading-snug text-red">{o.headline}</p>
        )}
      </div>

      <ul className="mb-5 flex-1 space-y-2">
        {o.points.map((p) => (
          <li key={p} className="flex gap-2 text-[13.5px] leading-snug text-body">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-red" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="mt-auto block rounded-full bg-navy px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-navy-3"
      >
        Demander un devis
      </a>
    </article>
  );
}

export default function Offres() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [ends, setEnds] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = el.scrollWidth / offers.length;
    setActive(Math.min(offers.length - 1, Math.round(el.scrollLeft / step)));
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

  const arrow = 'flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy transition hover:border-red hover:text-red disabled:cursor-default disabled:opacity-35 disabled:hover:border-line disabled:hover:text-navy';

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
            {/* Flèches : masquées au clavier tactile, le glissement suffit */}
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => go(-1)} disabled={ends.start} aria-label="Offres précédentes" className={arrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" onClick={() => go(1)} disabled={ends.end} aria-label="Offres suivantes" className={arrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={track}
          onScroll={sync}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2"
        >
          {offers.map((o) => (
            <Card key={o.id} o={o} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden>
          {offers.map((o, i) => (
            <span
              key={o.id}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-red' : 'w-1.5 bg-line'}`}
            />
          ))}
        </div>

        <p className="mt-5 text-center text-[12px] text-mut">
          Offres valables en centre Roady Solliès-Pont. Voir conditions en magasin ou au {' '}
          <a href="tel:+33494288142" className="font-semibold text-body underline underline-offset-2">04 94 28 81 42</a>.
        </p>
      </div>
    </section>
  );
}
