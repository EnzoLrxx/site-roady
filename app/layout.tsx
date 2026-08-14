import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Roady Solliès-Pont — Garage auto toutes marques · Entretien, pneus, freins, clim',
    template: '%s · Roady Solliès-Pont',
  },
  description:
    'Votre garage Roady à Solliès-Pont (83) : révision, vidange, pneus, freins, climatisation, distribution. Entretien toutes marques, devis gratuit, paiement en 3x/4x. Avec ou sans rendez-vous.',
  keywords: ['garage Solliès-Pont', 'garage auto 83210', 'vidange Solliès-Pont', 'pneus Solliès-Pont', 'climatisation auto', 'Roady Solliès-Pont'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: site.url,
    title: 'Roady Solliès-Pont — Garage auto toutes marques',
    description: 'Entretien, pneus, freins, climatisation. Devis gratuit, paiement 3x/4x, toutes marques.',
    siteName: 'Roady Solliès-Pont',
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: site.name,
    image: `${site.url}/og.jpg`,
    '@id': site.url,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: 'FR',
    },
    openingHours: 'Mo-Sa 08:30-12:00,14:00-17:30',
    priceRange: '€€',
  };
  return (
    <html lang="fr">
      <body className="bg-white font-sans text-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
