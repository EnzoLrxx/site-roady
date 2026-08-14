import { photos } from '@/lib/site';
import { totalReferences } from '@/lib/catalogue';
import Reveal from './Reveal';

// Chaque vignette mène à sa catégorie dans le catalogue. `href` cible l'ancre
// lue au chargement de /catalogue, qui ouvre l'onglet boutique et y descend.
const gallery = [
  { src: photos.essuie, label: 'Accessoires & essuie-glaces', href: '/catalogue#boutique-essuie-glaces' },
  { src: photos.batteries, label: 'Batteries', href: '/catalogue#boutique-batteries' },
  { src: photos.huiles, label: 'Huiles & liquides', href: '/catalogue#boutique-huiles-lubrifiants' },
  { src: photos.pneus, label: 'Pneus toutes marques', href: '/catalogue#boutique' },
];

export default function Boutique() {
  return (
    <section className="bg-wash py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-11 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">La boutique</span>
            <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">400 m² d’atelier &amp; de boutique</h2>
            <p className="text-[17px] text-body">
              Accessoires, batteries, huiles, ampoules, produits d’entretien… tout ce qu’il faut pour votre
              voiture, en libre-service ou avec nos conseils.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.label} delay={(i % 4) * 70}>
              <a
                href={g.href}
                className="group relative block overflow-hidden rounded-2xl border border-line transition hover:-translate-y-1 hover:border-red hover:shadow-[0_10px_32px_rgba(14,27,44,.14)]"
              >
                <img src={g.src} alt={g.label} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy/90 to-transparent p-3 text-[13px] font-semibold text-white">
                  {g.label}
                  <svg
                    className="h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-7 text-center text-[15px] text-body">
            <a href="/catalogue#boutique" className="font-bold text-red underline underline-offset-4 hover:text-red-dark">
              Voir les {totalReferences} références du catalogue
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
