'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLang } from './LangContext';

type LogosFS = {
  featured?: { pt?: string[]; en?: string[]; zh?: string[] };
  general?: string[];
};

type Props = {
  logosFS?: LogosFS;
  featuredOnly?: boolean;
  compact?: boolean;
  theme?: 'dark' | 'light';
  pxPerSec?: number;
  shuffle?: boolean;
  direction?: 'left' | 'right';
  delaySec?: number;
  bare?: boolean;
  /** NOVO: embaralhamento determinístico */
  seed?: number;
  /** NOVO: inverte a ordem final */
  reverse?: boolean;
};

function mulberry32(seed: number) {
  return function() {
    let t = (seed += 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle<T>(arr: T[], seed: number) {
  const rand = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ClientsTicker({
  logosFS,
  featuredOnly = true,
  compact = true,
  theme = 'dark',
  pxPerSec = 12,
  shuffle = true,
  direction = 'left',
  delaySec = 0,
  bare = false,
  seed,                
  reverse = false,     
}: Props) {
  const { lang } = useLang();
  const setARef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dist, setDist] = useState(0);   // px do primeiro conjunto
  const [dur, setDur] = useState(30);    // s = dist / pxPerSec

  // lista por idioma
  const baseLogos = useMemo(() => {
    let list: string[] = [];
    if (logosFS) {
      if (featuredOnly) {
        const map = logosFS.featured ?? {};
        const key = (lang === 'pt' ? 'pt' : lang === 'zh' ? 'zh' : 'en') as 'pt'|'en'|'zh';
        list = map[key] ?? [];
      } else {
        list = logosFS.general ?? [];
      }
    }
    return Array.from(new Set(list));
  }, [logosFS, featuredOnly, lang]);

// embaralhar com seed/reverse
const [logos, setLogos] = useState(baseLogos);
useEffect(() => {
  let arr = [...baseLogos];

  if (typeof seed === 'number') {
    arr = seededShuffle(arr, seed);
  } else if (shuffle) {
    // Fisher-Yates clássico
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  if (reverse) arr.reverse();

  setLogos(arr);
}, [baseLogos, shuffle, seed, reverse]);

  // recalcular distância/duração
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
  }, [recalc, logos.length]);

  const onImgLoad = () => recalc();

  const titleClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';

  // classes de item (sem cartão quando bare=true)
  const itemWrap = bare
    ? 'shrink-0 px-3' // só espaçamento lateral
    : theme === 'light'
    ? (compact ? 'bg-white ring-1 ring-slate-200 px-4 py-3 shrink-0 rounded-2xl'
               : 'bg-white ring-1 ring-slate-200 px-6 py-4 shrink-0 rounded-2xl shadow-sm')
    : (compact ? 'bg-white/5 ring-1 ring-white/10 px-4 py-3 shrink-0 rounded-2xl'
               : 'bg-slate-900/40 ring-1 ring-white/10 px-6 py-4 shrink-0 rounded-2xl');

  const imgClass = `${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`;

  const renderSet = (marker: 'A'|'B') => (
    <div ref={marker === 'A' ? setARef : undefined} className="flex gap-2 md:gap-4 shrink-0" aria-hidden={marker === 'B' ? 'true' : undefined}>
      {logos.map((src, i) => {
        const file = src.split('/').pop() || src;
        const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
        return (
          <div key={marker + i + src} className={itemWrap} title={company}>
            <img src={src} alt={company} className={imgClass} loading="lazy" height={compact ? 40 : 48} onLoad={onImgLoad} />
          </div>
        );
      })}
    </div>
  );

  const marqueeClass =
    direction === 'right'
      ? 'clients-ticker-marquee-rev'
      : 'clients-ticker-marquee';

  return (
    <div className="relative">
      {/* opcional: título
      <h4 className={`text-lg font-semibold mb-3 ${titleClass}`}>Empresas que confiam</h4> */}
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
          {renderSet('A')}
          {renderSet('B')}
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
