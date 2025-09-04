// lib/getLogos.ts
// Lê logos em /public/logo/... (e também /public/logos/... para compat),
 // mas só no servidor usando import dinâmico de 'fs' e 'path'.

type Lang = 'pt' | 'en' | 'zh';

function isBrowser() {
  return typeof window !== 'undefined';
}

export async function getLogos(subdir: string): Promise<string[]> {
  if (isBrowser()) return []; // nunca roda no cliente

  const fs = (await import('fs')).default as typeof import('fs');
  const path = (await import('path')).default as typeof import('path');

  const bases = ['logo', 'logos']; // prioriza /logo, mas aceita /logos por compat
  const seen = new Set<string>();
  const out: string[] = [];

  for (const base of bases) {
    const abs = path.join(process.cwd(), 'public', base, subdir);
    let files: string[] = [];
    try {
      files = fs.readdirSync(abs);
    } catch {
      continue;
    }
    for (const f of files) {
      if (!/\.(png|jpe?g|webp|svg)$/i.test(f)) continue;
      const pub = `/${base}/${subdir}/${f}`.replace(/\\/g, '/');
      if (!seen.has(pub)) {
        seen.add(pub);
        out.push(pub);
      }
    }
  }
  return out;
}

/** Destaques por idioma: /public/logo/destaque/(br|eng|ch) */
export async function getFeaturedByLang(): Promise<Record<Lang, string[]>> {
  const [pt, en, zh] = await Promise.all([
    getLogos('destaque/br'),
    getLogos('destaque/eng'),
    getLogos('destaque/ch'),
  ]);
  return { pt, en, zh };
}

/** Gerais: /public/logo/geral */
export async function getGeneral(): Promise<string[]> {
  return getLogos('geral');
}
