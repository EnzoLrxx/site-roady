'use client';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const links = [
  { href: '#prestations', label: 'Prestations' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#marques', label: 'Marques' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Accès' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition-colors ${solid ? 'bg-white/95 backdrop-blur border-b border-line' : 'bg-white/95 border-b border-line'}`}>
      <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-3 px-5">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-red font-black italic text-white">R</span>
          <span className="font-extrabold text-ink leading-tight">
            {site.name}
            <small className="block text-[11px] font-semibold text-mut">Garage auto · {site.legal}</small>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[14.5px] font-semibold text-body hover:text-red">{l.label}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-6">
          <span className="hidden whitespace-nowrap font-extrabold text-ink lg:inline">{site.phone}</span>
          <a href="#contact" className="rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-dark">Devis gratuit</a>
          <button aria-label="Menu" className="md:hidden" onClick={() => setOpen(!open)}>
            <svg width="26" height="26" fill="none" stroke="#0e1b2c" strokeWidth="2"><path d="M4 7h18M4 13h18M4 19h18" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-white px-5 py-3 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 font-semibold text-body">{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
