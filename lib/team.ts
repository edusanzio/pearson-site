// lib/team.ts
import type { Lang } from './dict';

export type Member = {
  name: string;
  role: string; // texto exibido (em PT por padrão na constante base)
  teamKey: 'comercial' | 'financeiro' | 'socio' | 'projetos';
  photo: string;
};

// Traduções por idioma, mapeadas por teamKey
const ROLE_I18N: Record<Lang, Record<Member['teamKey'], string>> = {
  pt: {
    comercial: 'Comercial',
    financeiro: 'Financeiro',
    socio: 'Sócio Administrativo',
    projetos: 'Projetos',
  },
  en: {
    comercial: 'Commercial',
    financeiro: 'Finance',
    socio: 'Managing Partner',
    projetos: 'Projects',
  },
  zh: {
    comercial: '商务',
    financeiro: '财务',
    socio: '管理合伙人',
    projetos: '项目',
  },
};

// Base em PT (continua igual)
export const TEAM: Member[] = [
  { name: 'Lua Sarkis',         role: 'Comercial',            teamKey: 'comercial',  photo: '/team/Luan.png' },
  { name: 'Guilherme Monteiro', role: 'Comercial',            teamKey: 'comercial',  photo: '/team/Gui2n.png' },
  { name: 'Aline Motta',        role: 'Financeiro',           teamKey: 'financeiro', photo: '/team/Aline3n.png' },
  { name: 'Eduardo Sanzio',     role: 'Sócio Administrativo', teamKey: 'socio',      photo: '/team/Edu3n.png' },
  { name: 'Emanuel Silva',      role: 'Projetos',             teamKey: 'projetos',   photo: '/team/Manu2n.png' },
  { name: 'Nathan Oliveira',    role: 'Projetos',             teamKey: 'projetos',   photo: '/team/Nathan2n.png' },
  { name: 'Giovanni Seiji',     role: 'Projetos',             teamKey: 'projetos',   photo: '/team/Seiji3n.png' },
];

/**
 * Retorna o time com a role já traduzida conforme o idioma.
 * Mantém o shape de Member (role:string).
 */
export function getTeam(lang: Lang): Member[] {
  const dict = ROLE_I18N[lang] ?? ROLE_I18N.en;
  return TEAM.map((m) => ({
    ...m,
    role: dict[m.teamKey] ?? m.role,
  }));
}