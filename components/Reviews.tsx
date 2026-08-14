import { reviews, site } from '@/lib/site';
import { Star } from './Icons';
import Reveal from './Reveal';

export default function Reviews() {
  return (
    <section id="avis" className="py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-11 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Avis clients</span>
            <h2 className="mb-4 mt-3 text-[34px] font-extrabold tracking-tight text-ink">Ils nous font confiance</h2>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2">
              <span className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" />)}</span>
              <span className="text-sm font-bold text-ink">{site.googleRating}/5</span>
              <span className="text-sm text-mut">· {site.googleCount}+ avis Google</span>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <figure className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(14,27,44,.08)]">
                <div className="mb-3 flex gap-0.5 text-amber-400">{Array.from({ length: r.stars }).map((_, k) => <Star key={k} />)}</div>
                <blockquote className="mb-4 text-[15px] leading-relaxed text-body">« {r.text} »</blockquote>
                <figcaption className="text-sm font-bold text-ink">{r.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-9 text-center">
          <a href={site.googleReviewsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-red hover:text-red">
            Voir tous nos avis Google →
          </a>
        </div>
      </div>
    </section>
  );
}
