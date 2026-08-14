import { brands } from '@/lib/site';
import Reveal from './Reveal';

export default function Brands() {
  const loop = [...brands, ...brands];
  return (
    <section id="marques" className="border-y border-line bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-9 text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Nos marques</span>
            <h2 className="mt-3 text-[28px] font-extrabold tracking-tight text-ink">
              Les grandes marques que nous utilisons &amp; distribuons
            </h2>
          </div>
        </Reveal>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track items-center gap-3 px-2">
          {loop.map((b, i) => (
            <span key={i} className="logo-chip flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-line bg-white px-6 shadow-[0_1px_6px_rgba(14,27,44,.04)]">
              <img src={b.logo} alt={b.name} title={b.name} className="logo-img max-h-14 max-w-[150px] object-contain" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
