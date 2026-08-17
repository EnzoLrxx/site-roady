import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Portes from '@/components/Portes';
import Services from '@/components/Services';
import Offres from '@/components/Offres';
import Problemes from '@/components/Problemes';
import Diagnostic from '@/components/Diagnostic';
import Boutique from '@/components/Boutique';
import WhyUs from '@/components/WhyUs';
import PaymentBand from '@/components/PaymentBand';
import Brands from '@/components/Brands';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Infos from '@/components/Infos';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Portes />
        <Services />
        <Offres />
        <Problemes />
        <Diagnostic />
        <Boutique />
        <WhyUs />
        <PaymentBand />
        <Brands />
        <Reviews />
        <FAQ />
        <Infos />
      </main>
      <Footer />
      <a
        href={site.phoneHref}
        aria-label="Appeler le garage"
        className="fixed bottom-[18px] right-[18px] z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-red text-white shadow-[0_8px_24px_rgba(226,0,26,.5)] md:hidden"
      >
        <svg width="26" height="26" fill="none" stroke="#fff" strokeWidth="2"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
      </a>
    </>
  );
}
