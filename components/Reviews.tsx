import { reviews, site } from '@/lib/site';
import { Star } from './Icons';
import Reveal from './Reveal';

export default function Reviews() {
  return (
    <section id="avis" className="bg-white py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">
              Avis clients
            </span>
            <h2 className="mt-3 text-[34px] font-extrabold tracking-tight text-ink">Ils nous font confiance</h2>
          </div>
        </Reveal>

        {/* Aucun témoignage n'est reproduit ici tant qu'aucun vrai avis n'a été repris
            depuis Google : la note et le lien vers la source suffisent, et ils sont
            vérifiables. La note n'est affichée qu'une fois — elle l'était deux fois. */}
        {reviews.length === 0 ? (
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-line bg-wash p-9 text-center sm:flex-row sm:gap-10 sm:text-left">
              <div className="shrink-0">
                <p className="text-[56px] font-extrabold leading-none tracking-tight text-ink">
                  {String(site.googleRating).replace('.', ',')}
                  <span className="text-[24px] font-bold text-mut">/5</span>
                </p>
                <div className="mt-2 flex justify-center gap-0.5 text-amber-400 sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5" />)}
                </div>
                <p className="mt-1.5 text-[13.5px] font-semibold text-mut">{site.googleCount} avis Google</p>
              </div>

              <div className="flex-1">
                <p className="text-[16.5px] leading-relaxed text-body">
                  <strong className="font-bold text-ink">{site.googleCount} clients</strong> ont pris le temps de
                  noter le garage. Plutôt que d’en sélectionner trois à notre avantage, nous préférons vous
                  laisser les lire tous, à la source.
                </p>
                <a
                  href={site.googleReviewsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-navy-3"
                >
                  Lire les avis sur Google
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.name} delay={i * 90}>
                  <figure className="h-full rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(14,27,44,.08)]">
                    <div className="mb-3 flex gap-0.5 text-amber-400">
                      {Array.from({ length: r.stars }).map((_, k) => <Star key={k} />)}
                    </div>
                    <blockquote className="mb-4 text-[15px] leading-relaxed text-body">« {r.text} »</blockquote>
                    <figcaption className="text-sm font-bold text-ink">{r.name}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className="mt-9 text-center">
              <a
                href={site.googleReviewsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-red hover:text-red"
              >
                Voir tous nos avis Google →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
