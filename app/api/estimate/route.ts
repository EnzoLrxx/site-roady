import { NextRequest, NextResponse } from 'next/server';
import estimatorData from '@/lib/estimator-data.json';

/**
 * Proxy serveur d'estimation : le formulaire poste ici (même origine, pas de secret exposé).
 * Si Lemonauto est câblé, on lui demande une fourchette « live » ; sinon — ou si l'appel
 * échoue — on répond avec les fourchettes statiques de lib/estimator-data.json.
 *
 * Principe : cette route ne renvoie JAMAIS d'erreur au front. Une estimation indisponible
 * dégrade vers le repli, elle ne casse pas le parcours de devis.
 */

type Category = {
  key: string;
  label: string;
  from?: number;
  low: number | null;
  high: number | null;
  note: string;
};

const CATEGORIES = estimatorData.categories as Category[];

export type Estimate = {
  category: string | null;
  label: string | null;
  from: number | null;
  low: number | null;
  high: number | null;
  note: string;
  disclaimer: string;
  /** 'live' = calculé par Lemonauto ; 'default' = repli statique. */
  source: 'live' | 'default';
};

function fallback(category?: string): Estimate {
  const c = CATEGORIES.find((x) => x.key === category);
  return {
    category: c?.key ?? category ?? null,
    label: c?.label ?? null,
    from: c?.from ?? null,
    low: c?.low ?? null,
    high: c?.high ?? null,
    note: c?.note ?? '',
    disclaimer: estimatorData._disclaimer,
    source: 'default',
  };
}

export async function POST(req: NextRequest) {
  let body: { category?: string; freetext?: string; vehicle?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(fallback());
  }

  const apiUrl = process.env.NEXT_PUBLIC_DEVIS_API_URL;
  const token = process.env.DEVIS_API_TOKEN;

  // Pas câblé -> repli statique. Le formulaire fonctionne sans Lemonauto.
  if (!apiUrl || !token) return NextResponse.json(fallback(body.category));

  const base = apiUrl.replace(/\/+$/, '');
  try {
    // Timeout court : une estimation doit être ressentie comme instantanée.
    // Au-delà, le repli est préférable à une attente.
    const r = await fetch(`${base}/api/public/estimate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': token },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(3500),
    });
    if (!r.ok) {
      console.error('[estimate] upstream', r.status);
      return NextResponse.json(fallback(body.category));
    }
    const live = await r.json();
    // On complète les manques avec le repli : Lemonauto peut ne renvoyer que low/high.
    const base_ = fallback(body.category);
    return NextResponse.json({
      ...base_,
      ...live,
      disclaimer: live.disclaimer ?? base_.disclaimer,
      source: 'live',
    } satisfies Estimate);
  } catch (e) {
    console.error('[estimate] network', e);
    return NextResponse.json(fallback(body.category));
  }
}
