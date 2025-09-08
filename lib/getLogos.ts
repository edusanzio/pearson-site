// lib/getLogos.ts
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'public', 'logos');
const DEST = path.join(ROOT, 'destaque');



function listImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const valid = /\.(png|jpe?g|webp|svg)$/i;
  return fs
    .readdirSync(dir)
    .filter((f) => valid.test(f))
    .map((f) => '/' + path.relative(path.join(process.cwd(), 'public'), path.join(dir, f)).replace(/\\/g, '/'));
}

/** Logos destacados por idioma, a partir de /public/logos/destaque/{br|eng|ch} */
export async function getFeaturedByLang(): Promise<{ pt?: string[]; en?: string[]; zh?: string[] }> {
  const result: { pt?: string[]; en?: string[]; zh?: string[] } = {};
  ['pt', 'en', 'zh'].forEach((folder) => {
    const key = folder;
    const dir = path.join(DEST, folder);
    const imgs = listImages(dir);
    if (imgs.length) (result as any)[key] = imgs;
  });
  return result;
}

/** Logos gerais (opcional): /public/logos/geral */
export async function getGeneral(): Promise<string[]> {
  const dir = path.join(ROOT, 'geral');
  return listImages(dir);
}
