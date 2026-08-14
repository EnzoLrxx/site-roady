import { services } from '@/lib/site';
import { ServiceIcon } from './Icons';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="prestations" className="py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-11 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Nos prestations</span>
            <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">Tout pour votre véhicule, au même endroit</h2>
            <p className="text-[17px] text-body">De la simple vidange aux grosses réparations, notre équipe s’occupe de tout — proprement et au juste prix.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 60}>
              <div className="group h-full rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-[#f2c9ce] hover:shadow-[0_6px_28px_rgba(14,27,44,.1)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-wash text-red">
                  <ServiceIcon name={s.icon} />
                </div>
                <h3 className="mb-1.5 text-[17.5px] font-bold text-ink">{s.t}</h3>
                <p className="text-sm text-mut">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
