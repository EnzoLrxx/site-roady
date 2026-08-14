import { site } from '@/lib/site';
import { Pin, Phone, Mail, Clock, Check } from './Icons';
import Reveal from './Reveal';
import DevisForm from './DevisForm';

export default function Infos() {
  const rows = [
    { ic: <Pin className="h-5 w-5" />, h: 'Adresse', p: <>{site.address.street}<br />{site.address.zip} {site.address.city}</> },
    { ic: <Phone className="h-5 w-5" />, h: 'Téléphone', p: <a href={site.phoneHref} className="font-bold text-red">{site.phone}</a> },
    { ic: <Mail className="h-5 w-5" />, h: 'Email', p: site.email },
    { ic: <Clock className="h-5 w-5" />, h: 'Horaires', p: site.hours },
  ];
  return (
    <>
      {/* DEVIS */}
      <section id="contact" className="bg-gradient-to-br from-navy to-navy-3 py-[74px] text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 md:grid-cols-2 md:gap-12">
          <Reveal>
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#ffd0d5]">Devis gratuit</span>
              <h2 className="mb-3.5 mt-3 text-[32px] font-extrabold tracking-tight text-white">Recevez votre devis gratuit</h2>
              <p className="mb-5 text-base text-white/90">Dites-nous ce dont votre voiture a besoin. On vous répond vite, avec un prix clair et sans engagement.</p>
              <ul className="flex flex-col gap-2.5">
                {['Réponse rapide, aux horaires d’ouverture', 'Prix clair, sans surprise', 'Sans engagement'].map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-white/90"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5a6a]" /> {t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}><DevisForm /></Reveal>
        </div>
      </section>

      {/* INFOS + MAP */}
      <section className="py-[74px]">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="mx-auto mb-11 max-w-2xl text-center">
              <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Nous trouver</span>
              <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">Accès &amp; horaires</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-line">
              {rows.map((r) => (
                <div key={r.h} className="flex items-start gap-3.5 border-b border-line px-5 py-[18px] last:border-b-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-red-wash text-red">{r.ic}</div>
                  <div><h4 className="text-[15px] font-bold text-ink">{r.h}</h4><p className="text-[14.5px] text-body">{r.p}</p></div>
                </div>
              ))}
            </div>
            <div className="min-h-[330px] overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Plan d'accès Roady Solliès-Pont"
                loading="lazy"
                className="h-full min-h-[330px] w-full border-0"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
