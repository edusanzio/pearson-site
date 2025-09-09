'use client';

import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { useLang } from './LangContext';

type LogosFS = {
  featured?: { pt?: string[]; en?: string[]; zh?: string[] };
  general?: string[];
};

export default function ClientsTickerPairClient({
  logosFS,
  theme = 'light',
  compact = false,
  bare = true,
  order = 'alpha',          // 'alpha' | 'as-is'
  pxPerSecTop = 10,
  pxPerSecBottom = 11,
  gapY = 8,
}: {
  logosFS: LogosFS;
  theme?: 'dark' | 'light';
  compact?: boolean;
  bare?: boolean;
  order?: 'alpha' | 'as-is';
  pxPerSecTop?: number;
  pxPerSecBottom?: number;
  gapY?: number;
}) {
  const { lang } = useLang();

  /** ===== utilidades ===== */
  const uniq = (arr: string[]) => Array.from(new Set(arr));
  const sortMaybe = useCallback(
    (list: string[]) => {
      if (order !== 'alpha') return list;
      return [...list].sort((a, b) => {
        const na = (a.split('/').pop() || a).toLowerCase();
        const nb = (b.split('/').pop() || b).toLowerCase();
        return na.localeCompare(nb);
      });
    },
    [order]
  );
  const isZhLogo = (src: string) => /\/zh\//i.test(src) || /(?:^|[-_.])(cn|zh)(?=\.(png|jpe?g|webp|svg)$)/i.test(src);

  /** ===== 1) Bases ===== */
  const brAll = useMemo(() => sortMaybe(uniq(logosFS.featured?.pt ?? [])), [logosFS, sortMaybe]);
  const enAll = useMemo(() => uniq(logosFS.featured?.en ?? []), [logosFS]);
  const zhAll = useMemo(() => uniq(logosFS.featured?.zh ?? []), [logosFS]);

  // União EN ∪ ZH removendo os que já estão no BR
  const intlUnion = useMemo(() => {
    const set = new Set<string>([...enAll, ...zhAll]);
    brAll.forEach((x) => set.delete(x));
    return sortMaybe(Array.from(set));
  }, [enAll, zhAll, brAll, sortMaybe]);

  /** ===== 2) Construção das duas linhas conforme idioma ===== */
  let topList: string[] = [];
  let bottomList: string[] = [];

  if (lang === 'pt') {
    // Duas linhas BR: split ao meio
    const half = Math.ceil(brAll.length / 2);
    topList = brAll.slice(0, half);
    bottomList = brAll.slice(half);
  } else {
    // en/zh: topo = INTL (EN ∪ ZH); baixo = BR (completa)
    if (intlUnion.length === 0) {
      // fallback: se não houver internacional, mantém BR dividido
      const half = Math.ceil(brAll.length / 2);
      topList = brAll.slice(0, half);
      bottomList = brAll.slice(half);
    } else {
      // Topo: INTL; para zh, centraliza chinesas
      if (lang === 'zh') {
        const zhList = intlUnion.filter(isZhLogo);
        const enList = intlUnion.filter((s) => !isZhLogo(s));
        const mid = Math.ceil(enList.length / 2);
        topList = [...enList.slice(0, mid), ...zhList, ...enList.slice(mid)];
      } else {
        topList = intlUnion;
      }
      bottomList = brAll; // BR inteiro na segunda linha
    }
  }

  return (
    <div>
      {/* Linha de cima */}
      <TickerLine
        list={topList}
        direction="left"
        pxPerSec={pxPerSecTop}
        compact={compact}
        theme={theme}
        bare={bare}
        delaySec={0}
      />

      {/* Linha de baixo */}
      {bottomList.length > 0 && (
        <div style={{ marginTop: gapY }}>
          <TickerLine
            list={bottomList}
            direction="right"
            pxPerSec={pxPerSecBottom}
            compact={compact}
            theme={theme}
            bare={bare}
            delaySec={-2}
          />
        </div>
      )}
    </div>
  );
}

// 1) Lê país pelo nome do arquivo (mesmo regex de antes, com fallbacks)
function guessCountryFromFilename(src: string): string | null {
  const file = src.split('/').pop() || src;

  // a) sufixo no nome: -de, _us, .cn etc.
  const m = file.match(
    /(?:^|[-_.])(br|us|gb|uk|cn|zh|jp|de|fr|it|es|kr|tw|ca|mx|ar|cl|au|nz|in|za|tr|pt)(?=\.(png|jpe?g|webp|svg)$)/i
  );
  if (m) {
    const cc = m[1].toLowerCase();
    if (cc === 'uk') return 'GB';
    if (cc === 'zh') return 'CN';
    return cc.toUpperCase();
  }

  return null; // sem país — cai no defaultFlag
}

// 2) Mapeia o código para a imagem da bandeira (FlagCDN)
//   tamanhos: h16/h20/h24... usamos h18 aprox (usa 20 no CDN)
function flagSrcFromCC(cc: string, size = 20): string | null {
  const up = cc.toUpperCase();
  if (up === 'INTL') return null; // sem bandeira para "mundo"
  const code = up.toLowerCase();  // ex.: 'de'
  return `https://flagcdn.com/h${size}/${code}.png`;
}

/** ===== Linha com marquee ===== */
function TickerLine({
  list,
  direction = 'left',
  pxPerSec = 10,
  compact = false,
  theme = 'light',
  bare = true,
  delaySec = 0,
  defaultFlag = 'INTL',
}: {
  list: string[];
  direction?: 'left' | 'right';
  pxPerSec?: number;
  compact?: boolean;
  theme?: 'dark' | 'light';
  bare?: boolean;
  delaySec?: number;
  defaultFlag?: 'BR' | 'INTL';
}) {
  const setARef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dist, setDist] = useState(0);
  const [dur, setDur] = useState(30);

  const recalc = useCallback(() => {
    const setA = setARef.current;
    const speed = Math.max(1, Math.min(80, pxPerSec));
    if (!setA) return;
    const width = setA.scrollWidth;
    setDist(width);
    setDur(width > 0 ? width / speed : 30);
  }, [pxPerSec]);

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recalc, list.length]);

  const onImgLoad = () => recalc();

  const itemWrap = bare
    ? 'relative shrink-0 px-3'
    : theme === 'light'
    ? (compact
        ? 'relative bg-white ring-1 ring-slate-200 px-4 py-3 shrink-0 rounded-2xl'
        : 'relative bg-white ring-1 ring-slate-200 px-6 py-4 shrink-0 rounded-2xl shadow-sm')
    : (compact
        ? 'relative bg-white/5 ring-1 ring-white/10 px-4 py-3 shrink-0 rounded-2xl'
        : 'relative bg-slate-900/40 ring-1 ring-white/10 px-6 py-4 shrink-0 rounded-2xl');

  const imgClass = `${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`;
  const marqueeClass = direction === 'right' ? 'clients-ticker-marquee-rev' : 'clients-ticker-marquee';

  const renderItem = (src: string, key: string) => {
    const file = src.split('/').pop() || src;
    const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
    const cc = guessCountryFromFilename(src) || defaultFlag;
    const flagUrl = flagSrcFromCC(cc, 20); // 20px de altura

    return (
      <div key={key} className={itemWrap} title={company}>
        <img
          src={src}
          alt={company}
          className={imgClass}
          loading="lazy"
          height={compact ? 40 : 48}
          onLoad={onImgLoad}
          decoding="async"
        />
        {flagUrl && (
          <img
            src={flagUrl}
            alt={cc}
            width={26}
            height={20}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute -top-1 -right-1 rounded-[2px] ring-1 ring-black/10 shadow"
          />
        )}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden px-1 py-2"
    >
      <div
        className={`flex ${marqueeClass} ${paused ? 'clients-ticker-paused' : ''}`}
        style={{
          ['--ticker-dist' as any]: `${dist}px`,
          ['--ticker-dur' as any]: `${dur}s`,
          animationDelay: `${delaySec}s`,
        }}
      >
        {/* Set A */}
        <div ref={setARef} className="flex gap-2 md:gap-4 shrink-0">
          {list.map((src, i) => renderItem(src, 'A' + i + src))}
        </div>
        {/* Set B (duplicado) */}
        <div className="flex gap-2 md:gap-4 shrink-0" aria-hidden="true">
          {list.map((src, i) => renderItem(src, 'B' + i + src))}
        </div>
      </div>

      {/* keyframes locais */}
      <style jsx global>{`
        @keyframes clients-ticker-x {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--ticker-dist, 0px))); }
        }
        @keyframes clients-ticker-x-rev {
          from { transform: translateX(calc(-1 * var(--ticker-dist, 0px))); }
          to   { transform: translateX(0); }
        }
        .clients-ticker-marquee {
          animation-name: clients-ticker-x;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: var(--ticker-dur, 30s);
          will-change: transform;
        }
        .clients-ticker-marquee-rev {
          animation-name: clients-ticker-x-rev;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: var(--ticker-dur, 30s);
          will-change: transform;
        }
        .clients-ticker-paused { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
