import { stats } from '@/lib/site';
import CountUp from './CountUp';

export default function Stats() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              <CountUp to={s.n} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-[13px] font-medium text-mut">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
