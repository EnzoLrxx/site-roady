import { photos, urgences } from '@/lib/site';
import { Check } from './Icons';
import Reveal from './Reveal';

const pts = [
  'Un contrôle complet à chaque passage à l’atelier',
  'Des photos de l’usure réelle de votre voiture',
  'Un devis clair, seulement sur ce qui est vraiment nécessaire',
];

export default function Diagnostic() {
  return (
    <section className="bg-white py-[74px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-line shadow-[0_20px_50px_rgba(14,27,44,.12)]">
              <img src={photos.atelier} alt="Bancs de diagnostic et station de climatisation de l’atelier" className="h-[360px] w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-3 hidden rounded-2xl bg-red px-5 py-4 text-white shadow-xl sm:block">
              <div className="text-2xl font-extrabold leading-none">100%</div>
              <div className="text-xs font-semibold text-white/85">transparent</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Ce qui nous rend différents</span>
            <h2 className="mb-4 mt-3 text-[34px] font-extrabold leading-tight tracking-tight text-ink">La preuve en photo, pas juste notre parole</h2>
            <p className="mb-5 text-[16.5px] text-body">
              Le plus dur, chez un garagiste, c’est de savoir si on peut lui faire confiance. Chez nous,
              vous ne décidez jamais à l’aveugle : lors du contrôle en atelier, on vous{' '}
              <b className="text-ink">montre en photo</b> l’état réel de vos pièces.
            </p>
            {/* Slogan imposé par le gérant (cahier §4). */}
            <p className="mb-6 text-[19px] font-extrabold uppercase leading-tight tracking-tight text-red">
              Vous voyez. Vous comprenez. Vous décidez.
            </p>
            <ul className="flex flex-col gap-3">
              {pts.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15.5px] text-body">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-wash text-red"><Check className="h-4 w-4" /></span>{p}
                </li>
              ))}
            </ul>

            {/* Hiérarchisation des travaux (cahier §5) : rassure sur le fait qu'on ne
                cherche pas à tout remplacer d'un coup. */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {urgences.map((u, i) => (
                <div
                  key={u.niveau}
                  className={`rounded-2xl border p-4 ${
                    i === 0 ? 'border-[#f2c9ce] bg-red-wash' : 'border-amber-200 bg-amber-50'
                  }`}
                >
                  <p
                    className={`text-[12px] font-extrabold uppercase tracking-wide ${
                      i === 0 ? 'text-red' : 'text-amber-700'
                    }`}
                  >
                    {u.niveau}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-body">{u.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13.5px] leading-snug text-mut">
              Nous ne cherchons pas à tout remplacer immédiatement : nous vous aidons à hiérarchiser
              les travaux.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
