import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Catalogue from '@/components/Catalogue';
import { site } from '@/lib/site';
import { totalPrestations, totalReferences } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Catalogue & tarifs — Roady Solliès-Pont',
  description: `Tous nos forfaits atelier avec leurs prix TTC (${totalPrestations} prestations) et les ${totalReferences} références en stock dans la boutique : filtres, huiles, freinage, batteries, pneus. Garage auto à Solliès-Pont (83).`,
  alternates: { canonical: `${site.url}/catalogue` },
  openGraph: {
    title: 'Catalogue & tarifs — Roady Solliès-Pont',
    description: 'Nos forfaits atelier avec les prix, et tout ce que la boutique tient en stock.',
    url: `${site.url}/catalogue`,
    type: 'website',
  },
};

export default function CataloguePage() {
  return (
    <>
      <Header />
      <main>
        <Catalogue />
      </main>
      <Footer />
    </>
  );
}
