/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Redirections des anciennes URLs WordPress -> nouvelles ancres.
    // Liste établie le 14/08/2026 depuis le sitemap Yoast du site en place
    // (sitemap_index.xml : post / page / category / author). Ce sont les URLs
    // RÉELLES, pas des suppositions.
    // Next renvoie un 308 pour `permanent: true` — Google le traite comme un 301.
    return [
      // Pages (page-sitemap.xml)
      { source: '/nos-offres', destination: '/#prestations', permanent: true },
      { source: '/devis-gratuit-pour-vos-reparations-auto-moto', destination: '/#contact', permanent: true },
      { source: '/renovation-auto', destination: '/#prestations', permanent: true },
      { source: '/decalaminage-hydrogene', destination: '/#prestations', permanent: true },
      { source: '/batterie-demarrage-auto-dans-le-var-83', destination: '/#prestations', permanent: true },
      // Article (post-sitemap.xml)
      { source: '/decalaminage-hydrogene-a-sollies-pont-tel-04-94-28-81-42', destination: '/#prestations', permanent: true },
      // Archives WordPress sans équivalent -> accueil
      { source: '/category/uncategorized', destination: '/', permanent: true },
      { source: '/author/roaderic83_', destination: '/', permanent: true },
    ];
  },
};
export default nextConfig;
