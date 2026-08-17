'use client';
import { problemes } from '@/lib/site';
import Reveal from './Reveal';

/** Évènement écouté par DevisForm pour présélectionner une catégorie. */
export const EVT_CATEGORIE = 'devis:categorie';

export default function Problemes() {
  // Un évènement plutôt qu'un état remonté jusqu'à la page : les deux sections
  // sont éloignées dans l'arbre, et le formulaire reste maître de son état.
  function choisir(categorie: string) {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent(EVT_CATEGORIE, { detail: categorie }));
  }

  return (
    <section id="problemes" className="bg-white py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">
              Vous ne savez pas quoi demander ?
            </span>
            <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">
              Quel problème rencontrez-vous ?
            </h2>
            <p className="text-[17px] text-body">
              Partez de ce que vous constatez. On identifie la piste, vous obtenez une estimation, et
              le prix exact après contrôle à l’atelier.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {problemes.map((p, i) => (
            <Reveal key={p.symptome} delay={(i % 3) * 60}>
              <button
                type="button"
                onClick={() => choisir(p.categorie)}
                className="group flex min-h-[92px] w-full items-center gap-4 rounded-2xl border border-line bg-white p-5 text-left transition hover:-translate-y-1 hover:border-red hover:shadow-[0_10px_32px_rgba(14,27,44,.12)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-bold leading-snug text-ink">{p.symptome}</span>
                  <span className="mt-1 block text-[13px] text-mut">{p.piste}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-wash text-navy transition group-hover:bg-red group-hover:text-white">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-7 text-center text-[13.5px] text-mut">
            Un symptôme ne suffit pas toujours à conclure : le diagnostic est réalisé à l’atelier,
            photos à l’appui, avant tout devis.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
