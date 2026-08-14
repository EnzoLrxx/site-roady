import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy serveur : le formulaire du site poste ici (même origine, pas de secret exposé).
 * Ce route forwarde vers l'API publique de Lemonauto avec le token secret (server-side).
 * Tant que NEXT_PUBLIC_DEVIS_API_URL / DEVIS_API_TOKEN ne sont pas configurés,
 * la demande est acceptée en "stub" (le site marche déjà, on câble Lemonauto plus tard).
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 });
  }

  // Honeypot : bot détecté -> on répond ok sans rien faire
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }
  if (!body.clientPhone || String(body.clientPhone).trim() === '') {
    return NextResponse.json({ error: 'phone required' }, { status: 400 });
  }

  const apiUrl = process.env.NEXT_PUBLIC_DEVIS_API_URL;
  const token = process.env.DEVIS_API_TOKEN;

  // Pas encore câblé -> stub (à retirer une fois Lemonauto branché)
  if (!apiUrl || !token) {
    console.log('[devis] (stub, non câblé) demande reçue:', body);
    return NextResponse.json({ ok: true, stub: true });
  }

  // Slash final toléré : `https://app.lemonauto.fr/` produirait sinon une URL en `//api/...`
  const base = apiUrl.replace(/\/+$/, '');

  try {
    // Sans timeout, un upstream qui pend laisse le visiteur bloqué sur « Envoi… ».
    const r = await fetch(`${base}/api/public/devis-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': token },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      console.error('[devis] upstream', r.status);
      return NextResponse.json({ error: 'upstream' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[devis] network', e);
    return NextResponse.json({ error: 'network' }, { status: 502 });
  }
}
