'use client';

import { useMemo } from 'react';
import { useLang } from './LangContext';
import { useEffect, useRef, useState, useCallback } from 'react';

type LogosFS = {
  featured?: { pt?: string[]; en?: string[]; zh?: string[] };
  general?: string[];
};

export default function ClientsTickerPairClient({
  logosFS,
  featuredOnly = true,
  theme = 'light',
  compact = false,
  bare = true,
  order = 'alpha',          // 'alpha' | 'as-is'
  pxPerSecTop = 10,
  pxPerSecBottom = 11,
  gapY = 8,
}: {
  logosFS: LogosFS;
  featuredOnly?: boolean;
  theme?: 'dark' | 'light';
  compact?: boolean;
  bare?: boolean;
  order?: 'alpha' | 'as-is';
  pxPerSecTop?: number;
  pxPerSecBottom?: number;
  gapY?: number;
}) {
  const { lang } = useLang();

  // 1) lista base pelo idioma
  const base = useMemo(() => {
    let list: string[] = [];
    if (featuredOnly) {
      const map = logosFS.featured ?? {};
      const key = (lang === 'pt' ? 'pt' : lang === 'zh' ? 'zh' : 'en') as 'pt'|'en'|'zh';
      list = map[key] ?? [];
    } else {
      list = logosFS.general ?? [];
    }
    list = Array.from(new Set(list));
    if (order === 'alpha') {
      list.sort((a, b) => {
        const na = (a.split('/').pop() || a).toLowerCase();
        const nb = (b.split('/').pop() || b).toLowerCase();
        return na.localeCompare(nb);
      });
    }
    return list;
  }, [logosFS, featuredOnly, lang, order]);

  // 2) divide em duas metades (ceil na de cima)
  const half = Math.ceil(base.length / 2);
  const topList = base.slice(0, half);
  const bottomList = base.slice(half);

  return (
    <div>
      <TickerLine
        list={topList}
        direction="left"
        pxPerSec={pxPerSecTop}
        compact={compact}
        theme={theme}
        bare={bare}
        delaySec={0}
      />
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

/** ===== Linha única (marquee CSS com px/s) ===== */
function TickerLine({
  list,
  direction = 'left',
  pxPerSec = 10,
  compact = false,
  theme = 'light',
  bare = true,
  delaySec = 0,
}: {
  list: string[];
  direction?: 'left' | 'right';
  pxPerSec?: number;
  compact?: boolean;
  theme?: 'dark' | 'light';
  bare?: boolean;
  delaySec?: number;
}) {
  const setARef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dist, setDist] = useState(0);  // px a percorrer (largura do set A)
  const [dur, setDur] = useState(30);   // segundos = dist / pxPerSec

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
    ? 'shrink-0 px-3'
    : theme === 'light'
    ? (compact ? 'bg-white ring-1 ring-slate-200 px-4 py-3 shrink-0 rounded-2xl'
               : 'bg-white ring-1 ring-slate-200 px-6 py-4 shrink-0 rounded-2xl shadow-sm')
    : (compact ? 'bg-white/5 ring-1 ring-white/10 px-4 py-3 shrink-0 rounded-2xl'
               : 'bg-slate-900/40 ring-1 ring-white/10 px-6 py-4 shrink-0 rounded-2xl');

  const imgClass = `${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`;
  const marqueeClass = direction === 'right' ? 'clients-ticker-marquee-rev' : 'clients-ticker-marquee';

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
          {list.map((src, i) => {
            const file = src.split('/').pop() || src;
            const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
            return (
              <div key={'A' + i + src} className={itemWrap} title={company}>
                <img src={src} alt={company} className={imgClass} loading="lazy" height={compact ? 40 : 48} onLoad={onImgLoad} />
              </div>
            );
          })}
        </div>

        {/* Set B (duplicado) */}
        <div className="flex gap-2 md:gap-4 shrink-0" aria-hidden="true">
          {list.map((src, i) => {
            const file = src.split('/').pop() || src;
            const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
            return (
              <div key={'B' + i + src} className={itemWrap} title={company}>
                <img src={src} alt={company} className={imgClass} loading="lazy" height={compact ? 40 : 48} onLoad={onImgLoad} />
              </div>
            );
          })}
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
