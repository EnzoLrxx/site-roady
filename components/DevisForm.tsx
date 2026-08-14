'use client';
import { useState } from 'react';
import { Check } from './Icons';

export default function DevisForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const payload = {
      clientName: String(fd.get('clientName') || ''),
      clientPhone: String(fd.get('clientPhone') || ''),
      clientEmail: String(fd.get('clientEmail') || ''),
      vehicle: {
        make: String(fd.get('make') || ''),
        model: '',
        plateNumber: String(fd.get('plate') || ''),
      },
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''), // honeypot
    };
    try {
      const r = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(r.ok ? 'ok' : 'err');
      if (r.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('err');
    }
  }

  if (status === 'ok') {
    return (
      <div className="rounded-[18px] bg-white p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,.3)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-wash text-red">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-ink">Demande envoyée !</h3>
        <p className="text-body">On vous rappelle sous 24h ouvrées. Merci de votre confiance.</p>
      </div>
    );
  }

  const field = 'w-full rounded-[10px] border-[1.5px] border-line bg-white px-3 py-2.5 text-[14.5px] text-ink outline-none transition focus:border-red focus:ring-2 focus:ring-red-wash';
  const label = 'mb-1 block text-[12.5px] font-bold text-ink';

  return (
    <form onSubmit={onSubmit} className="rounded-[18px] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,.3)]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="mb-3"><label className={label}>Nom</label><input name="clientName" required placeholder="Votre nom" className={field} /></div>
        <div className="mb-3"><label className={label}>Téléphone</label><input name="clientPhone" required type="tel" placeholder="06 __ __ __ __" className={field} /></div>
      </div>
      <div className="mb-3"><label className={label}>Email <span className="font-normal text-mut">(optionnel)</span></label><input name="clientEmail" type="email" placeholder="vous@email.fr" className={field} /></div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="mb-3"><label className={label}>Véhicule</label><input name="make" placeholder="Ex : Peugeot 208" className={field} /></div>
        <div className="mb-3"><label className={label}>Immatriculation</label><input name="plate" placeholder="AA-123-AA" className={field} /></div>
      </div>
      <div className="mb-3"><label className={label}>Votre besoin</label><textarea name="message" rows={3} placeholder="Ex : vidange + freins avant qui grincent" className={field} /></div>
      {/* honeypot anti-spam (caché) */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button disabled={status === 'sending'} className="mt-1.5 w-full rounded-full bg-red px-4 py-4 text-base font-bold text-white transition hover:bg-red-dark disabled:opacity-60">
        {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande'}
      </button>
      {status === 'err' && <p className="mt-2 text-center text-sm font-semibold text-red">Une erreur est survenue. Appelez-nous au 04 94 28 81 42.</p>}
      <p className="mt-3 text-center text-[11.5px] text-mut">En envoyant, vous acceptez d’être recontacté par le garage. Vos données ne sont jamais revendues.</p>
    </form>
  );
}
