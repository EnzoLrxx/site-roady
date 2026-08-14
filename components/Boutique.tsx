import { photos } from '@/lib/site';
import Reveal from './Reveal';

const gallery = [
  { src: photos.essuie, label: 'Accessoires & essuie-glaces' },
  { src: photos.batteries, label: 'Batteries' },
  { src: photos.huiles, label: 'Huiles & liquides' },
  { src: photos.atelier, label: 'Atelier mécanique' },
];

export default function Boutique() {
  return (
    <section className="bg-wash py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-11 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">La boutique</span>
            <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">400 m² d’atelier &amp; de boutique</h2>
            <p className="text-[17px] text-body">Accessoires, batteries, huiles, ampoules, produits d’entretien… tout ce qu’il faut pour votre voiture, en libre-service ou avec nos conseils.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.label} delay={(i % 4) * 70}>
              <figure className="group relative overflow-hidden rounded-2xl border border-line">
                <img src={g.src} alt={g.label} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-3 text-[13px] font-semibold text-white">{g.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
