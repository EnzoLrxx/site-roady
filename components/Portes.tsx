import { portes } from '@/lib/site';
import { ServiceIcon } from './Icons';
import Reveal from './Reveal';

/**
 * « Par où commencer ? » (cahier §12) : trois entrées selon ce que le visiteur
 * sait déjà de son besoin — la prestation, le symptôme, ou rien du tout.
 */
export default function Portes() {
  return (
    <section className="border-b border-line bg-white py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="mb-8 text-center text-[15px] font-extrabold uppercase tracking-[.14em] text-mut">
            Par où commencer ?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {portes.map((p, i) => (
            <Reveal key={p.titre} delay={i * 70}>
              <a
                href={p.href}
                className="group flex h-full min-h-[168px] flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-red hover:shadow-[0_10px_32px_rgba(14,27,44,.12)]"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-wash text-red transition group-hover:bg-red group-hover:text-white">
                  <ServiceIcon name={p.icon} />
                </span>
                <span className="text-[17.5px] font-extrabold leading-tight text-ink">{p.titre}</span>
                <span className="mt-1.5 flex-1 text-[14px] leading-relaxed text-body">{p.desc}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-red">
                  {p.cta}
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
