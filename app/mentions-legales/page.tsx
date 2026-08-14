import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = { title: 'Mentions légales' };

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm font-semibold text-red">← Retour à l’accueil</Link>
      <h1 className="mb-6 mt-4 text-3xl font-extrabold text-ink">Mentions légales</h1>
      <div className="space-y-5 text-[15px] leading-relaxed text-body">
        <section>
          <h2 className="mb-1 font-bold text-ink">Éditeur du site</h2>
          <p>{site.legal} — enseigne {site.name}<br />{site.address.street}, {site.address.zip} {site.address.city}<br />Téléphone : {site.phone} · Email : {site.email}</p>
          <p className="text-mut">SIRET, RCS, capital social, TVA intracommunautaire et nom du directeur de la publication : <em>à compléter</em>.</p>
        </section>
        <section>
          <h2 className="mb-1 font-bold text-ink">Hébergement</h2>
          <p>Site hébergé sur Railway. Nom de domaine géré chez IONOS (1&amp;1).</p>
        </section>
        <section>
          <h2 className="mb-1 font-bold text-ink">Propriété intellectuelle</h2>
          <p>L’ensemble des contenus de ce site est la propriété de {site.legal}, sauf mentions contraires. Toute reproduction est interdite sans autorisation.</p>
        </section>
      </div>
    </main>
  );
}
