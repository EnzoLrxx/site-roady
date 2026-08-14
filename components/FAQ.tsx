'use client';
import { useState } from 'react';
import { faq, zones } from '@/lib/site';
import Reveal from './Reveal';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-[74px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 lg:grid-cols-[1.1fr_.9fr]">
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
        <Reveal delay={100}>
          <div className="rounded-2xl border border-line bg-wash p-7">
            <h3 className="text-lg font-extrabold text-ink">Nous intervenons autour de Solliès-Pont</h3>
            <p className="mt-2 text-[14.5px] text-body">Nos clients viennent de tout le secteur. Vous êtes à côté ? On vous attend :</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {zones.map((z) => (
                <span key={z} className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] font-semibold text-body">{z}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
