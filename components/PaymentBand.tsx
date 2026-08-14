import { site } from '@/lib/site';
import Reveal from './Reveal';

export default function PaymentBand() {
  return (
    <section className="bg-gradient-to-br from-red to-red-dark py-14 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Une grosse réparation ? Payez en 3x ou 4x.</h2>
              <p className="mt-2 text-white/90">Distribution, embrayage, freins… étalez le paiement par carte, sans dossier compliqué. On s’occupe de tout, vous roulez l’esprit tranquille.</p>
            </div>
            <a href={site.phoneHref} className="shrink-0 rounded-full bg-white px-7 py-4 font-bold text-red shadow-lg transition hover:-translate-y-0.5">Nous appeler · {site.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
