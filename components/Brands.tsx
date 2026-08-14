import { brands } from '@/lib/site';
import Reveal from './Reveal';

export default function Brands() {
  const loop = [...brands, ...brands];
  return (
    <section id="marques" className="border-y border-line bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="mb-9 text-center text-sm font-extrabold uppercase tracking-[.14em] text-mut">
            Les grandes marques que nous utilisons &amp; distribuons
          </p>
        </Reveal>
      </div>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track items-center gap-3 px-2">
          {loop.map((b, i) => (
            <span key={i} className="logo-chip flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-line bg-white px-6">
              <img src={b.logo} alt={b.name} title={b.name} className="logo-img max-h-11 max-w-[120px] object-contain" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
