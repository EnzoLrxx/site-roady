import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-navy px-5 pb-7 pt-[52px] text-white/75">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-9 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3 text-lg font-extrabold text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-red font-black italic text-white">R</span>
              <span>{site.name}<small className="block text-[11px] font-semibold text-white/60">{site.legal}</small></span>
            </div>
            <p className="max-w-sm text-[14.5px]">Votre garage automobile toutes marques à {site.address.city}. Entretien, réparation, pneus et climatisation — au juste prix, en toute transparence.</p>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-bold uppercase tracking-wide text-white">Prestations</h4>
            {['Révision & vidange', 'Pneus & géométrie', 'Freinage', 'Climatisation'].map((l) => (
              <a key={l} href="#prestations" className="mb-2 block text-[14.5px] hover:text-white">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="mb-3.5 text-sm font-bold uppercase tracking-wide text-white">Le garage</h4>
            <a href="#pourquoi" className="mb-2 block text-[14.5px] hover:text-white">Pourquoi nous</a>
            <a href="#contact" className="mb-2 block text-[14.5px] hover:text-white">Devis gratuit</a>
            <a href={site.phoneHref} className="mb-2 block text-[14.5px] hover:text-white">{site.phone}</a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2.5 pt-5 text-[13px] text-white/55">
          <span>© {new Date().getFullYear()} {site.name} — {site.legal}. Tous droits réservés.</span>
          <span className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
