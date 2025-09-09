// components/ClientsTickerFS.tsx
import ClientsTickerPairClient from './ClientsTickerPairClient';
import { getFeaturedByLang, getGeneral } from '@/lib/getLogos';

export default async function ClientsTickerFS({
  variant = 'featured',

  // visual/container
  overlay = true,                 // sobrepõe um pouco o Hero (-mt)
  overlayClass = '-mt-8 md:-mt-12',
  whiteBg = true,                 // faixa branca
  containerClass = 'ring-1 ring-slate-200/70 shadow-sm',
  innerClass,                     // se não passar, escolhemos com base no fullBleed
  gapY = 8,                       // espaçamento entre as linhas em px

  // comportamento
  compact = false,                // logos maiores = false
  bare = true,                    // só logos (sem cartões)
  order = 'alpha',                // 'alpha' | 'as-is'
  pxPerSecTop = 10,
  pxPerSecBottom = 11,

  // NOVO: full-bleed nativo
  fullBleed = true,               // ocupa 100vw mesmo dentro de containers estreitos
  edgePadding = 'px-0 py-4',      // padding interno quando fullBleed está ativo
}: {
  variant?: 'featured' | 'general';

  // visual/container
  overlay?: boolean;
  overlayClass?: string;
  whiteBg?: boolean;
  containerClass?: string;
  innerClass?: string;
  gapY?: number;

  // comportamento
  compact?: boolean;
  bare?: boolean;
  order?: 'alpha' | 'as-is';
  pxPerSecTop?: number;
  pxPerSecBottom?: number;

  // NOVO
  fullBleed?: boolean;
  edgePadding?: string;
}) {
  const featured = await getFeaturedByLang();
  const general = await getGeneral();

  // sobrepor o Hero
  const wrapStart = overlay ? `relative z-10 ${overlayClass}` : '';

  // classes para "estourar" para 100vw mesmo dentro de um container centrado
  const bleed = fullBleed
    ? 'relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen'
    : '';

  // faixa de fundo (branca opcional) + full-bleed
  const bgBase = whiteBg ? `bg-white ${containerClass}` : '';
  const bgCls = `${bgBase} ${bleed}`.trim();

  // conteúdo interno: se não vier innerClass, define automático conforme fullBleed
  const inner =
    innerClass ??
    (fullBleed
      ? `w-screen max-w-none ${edgePadding}`
      : `max-w-6xl mx-auto px-6 py-4`);

  return (
    <div className={wrapStart}>
      <div className={bgCls}>
        <div className={inner}>
          <ClientsTickerPairClient
            logosFS={{ featured, general }}
            featuredOnly={variant === 'featured'}
            theme="light"
            compact={compact}
            bare={bare}
            order={order}
            pxPerSecTop={pxPerSecTop}
            pxPerSecBottom={pxPerSecBottom}
            gapY={gapY}
          />
        </div>
      </div>
    </div>
  );
}
