'use client';
import { useState } from 'react';
import { faq, zones, site } from '@/lib/site';
import { Pin, Phone } from './Icons';
import Reveal from './Reveal';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-[74px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Questions fréquentes</span>
            <h2 className="mb-6 mt-3 text-[32px] font-extrabold tracking-tight text-ink">Tout ce qu’il faut savoir</h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 50}>
                <div className="overflow-hidden rounded-xl border border-line">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                    <span className="text-[15.5px] font-bold text-ink">{f.q}</span>
                    <span className={`shrink-0 text-red transition ${open === i ? 'rotate-45' : ''}`}>
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M11 5v12M5 11h12" /></svg>
                    </span>
                  </button>
                  <div className={`acc-panel ${open === i ? 'open' : ''}`}>
                    <div><p className="px-5 pb-4 text-[14.5px] leading-relaxed text-body">{f.a}</p></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* Colonne de droite collante : sans cela, une petite carte flottait en haut
            face à cinq questions, laissant un grand vide en dessous. Elle accompagne
            désormais la lecture et se termine par un appel à l'action. */}
        <Reveal delay={100}>
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-line">
              <div className="border-b border-line bg-wash px-7 py-6">
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink">
                  <Pin className="h-5 w-5 shrink-0 text-red" />
                  Notre zone d’intervention
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-body">
                  Nos clients viennent de tout le secteur. Vous êtes à côté ? On vous attend :
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {zones.map((z) => (
                    <span key={z} className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-semibold text-body">{z}</span>
                  ))}
                </div>
                <p className="mt-3 text-[12.5px] text-mut">…et toute la vallée du Gapeau.</p>
              </div>

              <div className="bg-white px-7 py-6">
                <h3 className="text-[16.5px] font-extrabold text-ink">Votre question n’est pas là ?</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-body">
                  Appelez-nous, on répond directement — pas de standard, pas d’attente.
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-navy-3"
                >
                  <Phone className="h-[18px] w-[18px]" /> {site.phone}
                </a>
                <a
                  href="#contact"
                  className="mt-2.5 block text-center text-[13.5px] font-semibold text-red underline underline-offset-2"
                >
                  ou demander un devis gratuit
                </a>
                <p className="mt-4 border-t border-line pt-3 text-[12.5px] text-mut">{site.hours}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
