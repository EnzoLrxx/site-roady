import Link from 'next/link';
import { site, legalInfo } from '@/lib/site';

export const metadata = { title: 'Mentions légales' };

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm font-semibold text-red">← Retour à l’accueil</Link>
      <h1 className="mb-6 mt-4 text-3xl font-extrabold text-ink">Mentions légales</h1>
      <div className="space-y-6 text-[15px] leading-relaxed text-body">
        <section>
          <h2 className="mb-1.5 font-bold text-ink">Éditeur du site</h2>
          <p>
            <strong className="font-semibold text-ink">
              {legalInfo.forme} {legalInfo.denomination}
            </strong>{' '}
            — enseigne {site.name}
            <br />
            Société par actions simplifiée au capital de {legalInfo.capital}
            <br />
            Siège social : {legalInfo.siege}
            <br />
            Établissement : {site.address.street}, {site.address.zip} {site.address.city}
            <br />
            Téléphone : {site.phone} · Email : {site.email}
          </p>
          <ul className="mt-2 space-y-0.5">
            <li>RCS : {legalInfo.rcs}</li>
            <li>SIREN : {legalInfo.siren}</li>
            {legalInfo.siret && <li>SIRET : {legalInfo.siret}</li>}
            <li>TVA intracommunautaire : {legalInfo.tva}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1.5 font-bold text-ink">Directeur de la publication</h2>
          <p>
            {legalInfo.directeur}, {legalInfo.directeurQualite} de {legalInfo.forme}{' '}
            {legalInfo.denomination}.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-bold text-ink">Hébergement</h2>
          <p>
            Site hébergé par <strong className="font-semibold text-ink">Railway Corporation</strong> —{' '}
            <a href="https://railway.com" target="_blank" rel="noopener" className="text-red underline underline-offset-2">
              railway.com
            </a>
            .
            <br />
            Nom de domaine géré par <strong className="font-semibold text-ink">IONOS SARL</strong> —{' '}
            <a href="https://www.ionos.fr" target="_blank" rel="noopener" className="text-red underline underline-offset-2">
              ionos.fr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-bold text-ink">Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus de ce site (textes, photographies, logos) est la propriété de{' '}
            {legalInfo.forme} {legalInfo.denomination}, sauf mentions contraires. Les marques citées
            appartiennent à leurs titulaires respectifs. Toute reproduction est interdite sans
            autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-1.5 font-bold text-ink">Données personnelles</h2>
          <p>
            Les informations transmises via le formulaire de devis servent uniquement à vous
            recontacter et ne sont jamais revendues. Pour connaître vos droits et exercer une demande
            d’accès, de rectification ou de suppression, consultez notre{' '}
            <Link href="/confidentialite" className="text-red underline underline-offset-2">
              politique de confidentialité
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
