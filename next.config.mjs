/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Redirections 301 des anciennes URLs WordPress -> nouvelles ancres.
    // À compléter avec les vraies anciennes URLs (voir REDIRECTIONS-301.md).
    return [
      { source: '/offres', destination: '/#prestations', permanent: true },
      { source: '/prestations-atelier', destination: '/#prestations', permanent: true },
      { source: '/nos-prestations', destination: '/#prestations', permanent: true },
      { source: '/marques', destination: '/#marques', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/avis-clients', destination: '/#avis', permanent: true },
    ];
  },
};
export default nextConfig;
