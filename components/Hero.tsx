import { site, photos } from '@/lib/site';
import { Check, Star } from './Icons';

const trust = ['Toutes marques', 'Sans rendez-vous', 'Paiement 3x / 4x', 'Devis gratuit'];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy text-white">
      {/* Photo de fond : la devanture doit se voir. Le voile est donc dégradé
          horizontalement — opaque à gauche pour que le texte reste lisible,
          presque transparent à droite où la photo est mise en valeur. */}
      <img src={photos.devanture} alt="Le centre auto Roady de Solliès-Pont vu de l’extérieur" className="hero-img absolute inset-0 h-full w-full object-cover opacity-[.68]" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40" />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(760px 380px at 88% -10%, rgba(226,0,26,.4), transparent 60%)' }} />

      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 sm:pt-24">
        <div className="mb-5 inline-flex animate-fadeUp items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[13px] font-bold backdrop-blur">
          <span className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}</span>
          <span className="text-white/90">{site.googleRating}/5 · {site.googleCount}+ avis · Solliès-Pont (83)</span>
        </div>

        <h1 className="mb-4 max-w-3xl animate-fadeUp text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-[52px]" style={{ animationDelay: '.05s' }}>
          Votre garage de confiance à <span className="text-[#ff5a6a]">Solliès-Pont.</span>
        </h1>
        <p className="mb-8 max-w-xl animate-fadeUp text-lg text-white/90" style={{ animationDelay: '.1s' }}>
          Entretien, pneus, freins, climatisation, distribution… Toutes marques, au juste prix, et surtout <b className="font-bold text-white">sans mauvaise surprise</b> — on vous montre tout en photo.
        </p>
        <div className="mb-10 flex animate-fadeUp flex-wrap gap-3.5" style={{ animationDelay: '.15s' }}>
          <a href="#contact" className="rounded-full bg-red px-7 py-4 font-bold text-white shadow-lg shadow-red/30 transition hover:-translate-y-0.5 hover:bg-red-dark">Demander un devis gratuit</a>
          <a href={site.phoneHref} className="flex items-center gap-2 rounded-full border-[1.5px] border-white/35 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20">📞 {site.phone}</a>
        </div>
        <div className="flex max-w-3xl flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-2 text-[14.5px] font-semibold text-white/90">
              <Check className="h-5 w-5 shrink-0 text-[#ff5a6a]" /> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
