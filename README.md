# Pearson Consultoria — Site (Next.js + Tailwind + i18n simples)

Pronto para **Vercel**. App Router, TypeScript, Tailwind, dicionário client-side PT/EN/中文, vídeo de fundo no hero, e seções completas.

## Como publicar na Vercel
1. Baixe o ZIP deste repositório.
2. Crie um novo projeto na Vercel e importe o repositório (ou **Suba o ZIP** via GitHub).
3. Sem variáveis de ambiente necessárias. Build padrão do Next.js.
4. Após o deploy, aponte o domínio `www.pearsonconsultoria.com.br` via DNS (CNAME para `cname.vercel-dns.com`).

## Scripts
- `npm install`
- `npm run dev` — desenvolvimento
- `npm run build && npm start` — produção local

## Estrutura
- `app/` — App Router (layout, página e estilos)
- `components/` — Header, Hero e seções
- `lib/dict.ts` — textos (PT/EN/中文)

## Observações
- O vídeo de fundo usa `https://youtu.be/zv9ivnKmb5c` com autoplay, mute e loop.
- Se quiser i18n com SEO por rota (`/en`, `/zh`), posso migrar para Next Intl / next-i18next.
