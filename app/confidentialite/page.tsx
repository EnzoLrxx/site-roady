import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = { title: 'Politique de confidentialité' };

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm font-semibold text-red">← Retour à l’accueil</Link>
      <h1 className="mb-6 mt-4 text-3xl font-extrabold text-ink">Politique de confidentialité</h1>
      <div className="space-y-5 text-[15px] leading-relaxed text-body">
        <p>{site.legal} ({site.name}) attache une grande importance à la protection de vos données personnelles.</p>
        <section>
          <h2 className="mb-1 font-bold text-ink">Données collectées</h2>
          <p>Via le formulaire de demande de devis : nom, téléphone, email (optionnel), informations sur le véhicule et description du besoin. Ces données servent uniquement à traiter votre demande et à vous recontacter.</p>
        </section>
        <section>
          <h2 className="mb-1 font-bold text-ink">Conservation &amp; partage</h2>
          <p>Vos données ne sont jamais revendues. Elles sont conservées le temps nécessaire au traitement de votre demande et à la relation commerciale.</p>
        </section>
        <section>
          <h2 className="mb-1 font-bold text-ink">Vos droits</h2>
          <p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour l’exercer, écrivez à {site.email}.</p>
        </section>
      </div>
    </main>
  );
}
