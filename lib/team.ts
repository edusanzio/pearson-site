// lib/team.ts
export type Member = {
  name: string;
  role: string;     // texto que vai aparecer
  teamKey: 'comercial' | 'financeiro' | 'socio' | 'projetos'; // p/ filtros futuros
  photo: string;    // caminho em /public/team/...
};

export const TEAM: Member[] = [
  { name: 'Lua Sarkis',        role: 'Comercial',             teamKey: 'comercial',  photo: '/team/Luan.png' },
  { name: 'Guilherme Monteiro',role: 'Comercial',             teamKey: 'comercial',  photo: '/team/Gui2n.png' },
  { name: 'Aline Motta',       role: 'Financeiro',            teamKey: 'financeiro', photo: '/team/Aline3n.png' },
  { name: 'Eduardo Sanzio',    role: 'Sócio Administrativo',  teamKey: 'socio',      photo: '/team/Edu3n.png' },
  { name: 'Emanuel Silva',     role: 'Projetos',              teamKey: 'projetos',   photo: '/team/Manu2n.png' },
  { name: 'Nathan Oliveira',   role: 'Projetos',              teamKey: 'projetos',   photo: '/team/Nathan2n.png' },
  { name: 'Giovanni Seiji',    role: 'Projetos',              teamKey: 'projetos',   photo: '/team/Seiji3n.png' },
];
