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
  /** velocidade em pixels/segundo (recomendo 10–16) */
  pxPerSec?: number;
  /** embaralhar para dar variedade visual */
  shuffle?: boolean;
};

export default function ClientsTicker({
  logosFS,
  featuredOnly = true,
  compact = true,
  theme = 'dark',
  pxPerSec = 12,
  shuffle = true,
}: Props) {
  const { lang } = useLang();
  const setARef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [dist, setDist] = useState(0);  // px do primeiro conjunto
  const [dur, setDur] = useState(30);   // segundos = dist / pxPerSec

  // pega lista conforme idioma atual
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
    // remove duplicados por segurança
    return Array.from(new Set(list));
  }, [logosFS, featuredOnly, lang]);

  // embaralhar (client-side) para não dar mismatch de hydration
  const [logos, setLogos] = useState(baseLogos);
  useEffect(() => {
    if (!shuffle) { setLogos(baseLogos); return; }
    const arr = [...baseLogos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setLogos(arr);
  }, [baseLogos, shuffle]);

  // recalcula distância e duração
  const recalc = useCallback(() => {
    const setA = setARef.current;
    const speed = Math.max(1, Math.min(80, pxPerSec)); // clamp
    if (!setA) return;
    const width = setA.scrollWidth;  // largura efetiva do primeiro conjunto
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
  const cardClass =
    theme === 'light'
      ? (compact ? 'bg-white ring-1 ring-slate-200 px-4 py-3' : 'bg-white ring-1 ring-slate-200 px-6 py-4 shadow-sm')
      : (compact ? 'bg-white/5 ring-1 ring-white/10 px-4 py-3' : 'bg-slate-900/40 ring-1 ring-white/10 px-6 py-4');

  // duplica (A + B) para loop contínuo
  const renderSet = (marker: 'A'|'B') => (
    <div ref={marker === 'A' ? setARef : undefined} className="flex gap-6 shrink-0" aria-hidden={marker === 'B' ? 'true' : undefined}>
      {logos.map((src, i) => {
        const file = src.split('/').pop() || src;
        const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
        return (
          <div key={marker + i + src} className={`rounded-2xl ${cardClass} shrink-0`}>
            <img
              src={src}
              alt={company}
              className={`${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`}
              loading="lazy"
              height={compact ? 40 : 48}
              onLoad={onImgLoad}
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="relative">
      {/* opcional: título (remova se não quiser) */}
      {/* <h4 className={`text-lg font-semibold mb-3 ${titleClass}`}>Empresas que confiam</h4> */}

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden px-1 py-2"
      >
        <div
          className={`flex clients-ticker-marquee ${paused ? 'clients-ticker-paused' : ''}`}
          style={{ ['--ticker-dist' as any]: `${dist}px`, ['--ticker-dur' as any]: `${dur}s` }}
        >
          {renderSet('A')}
          {renderSet('B')}
        </div>
      </div>

      {/* keyframes locais (não depende do globals.css) */}
      <style jsx global>{`
        @keyframes clients-ticker-x {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--ticker-dist, 0px))); }
        }
        .clients-ticker-marquee {
          animation-name: clients-ticker-x;
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
