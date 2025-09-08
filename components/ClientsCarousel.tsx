'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { Client } from '@/lib/clients';
import { useLang } from './LangContext';

type LogosFS = {
  featured?: { pt?: string[]; en?: string[]; zh?: string[] };
  general?: string[];
};

type Props = {
  clients?: Client[];
  title?: string;
  compact?: boolean;
  companies?: string[];
  exclude?: string[];
  featuredOnly?: boolean;
  logosFS?: LogosFS;
  shuffle?: boolean;
  hideHeader?: boolean;
  theme?: 'dark' | 'light';
  /** liga o auto-scroll contínuo (marquee CSS) */
  autoScroll?: boolean;
  /** velocidade em pixels/segundo (10–16 = suave) */
  autoScrollPxPerSec?: number;
};

export default function ClientsCarousel({
  clients = [],
  title = 'Alguns clientes',
  compact = false,
  companies,
  exclude,
  featuredOnly = false,
  logosFS,
  shuffle = true,
  hideHeader = false,
  theme = 'dark',
  autoScroll = false,
  autoScrollPxPerSec = 12,
}: Props) {
  const { lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const setARef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [distance, setDistance] = useState(0);   // px a percorrer (largura do primeiro set)
  const [duration, setDuration] = useState(30);  // segundos (distance / pxPerSec)

  // ---------- monta a lista de logos (FS OU clients.ts) ----------
  const baseLogos = useMemo(() => {
    if (logosFS) {
      const list = featuredOnly
        ? (logosFS.featured?.[lang as 'pt' | 'en' | 'zh'] ?? [])
        : (logosFS.general ?? []);
      return list.map((src) => {
        const file = src.split('/').pop() || src;
        const company = file.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
        return { company, logo: src };
      });
    }
    // modo clients.ts
    const hasLogo = (c: Client) => typeof c.logo === 'string' && c.logo.trim().length > 0;
    let arr = clients;
    if (featuredOnly) arr = arr.filter((c) => c.featuredIn?.includes(lang));
    if (exclude?.length) {
      const ex = new Set(exclude);
      arr = arr.filter((c) => !ex.has(c.company));
    }
    arr = arr.filter(hasLogo);
    const map = new Map<string, string>();
    arr.forEach((c) => {
      const logo = (c.logo || '').trim();
      if (logo && !map.has(c.company)) map.set(c.company, logo);
    });
    const list = companies?.length
      ? companies.filter((n) => map.has(n)).map((n) => ({ company: n, logo: map.get(n)! }))
      : Array.from(map, ([company, logo]) => ({ company, logo }));
    return list;
  }, [clients, companies, exclude, featuredOnly, logosFS, lang]);

  // embaralha para dar variação visual
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

  // ---------- recalcula distância e duração com base na largura real ----------
  const recalc = useCallback(() => {
    const setA = setARef.current;
    if (!setA) return;
    const width = setA.scrollWidth; // largura do primeiro conjunto
    const pxPerSec = Math.max(1, Math.min(200, autoScrollPxPerSec));
    setDistance(width);
    setDuration(width > 0 ? width / pxPerSec : 30);
  }, [autoScrollPxPerSec]);

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [recalc, logos.length]);

  // quando cada imagem carregar, refaz o cálculo (importante com 5 logos)
  const onImgLoad = () => recalc();

  const titleClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const cardClass =
    theme === 'light'
      ? (compact ? 'bg-white ring-1 ring-slate-200 px-4 py-3' : 'bg-white ring-1 ring-slate-200 px-6 py-4 shadow-sm')
      : (compact ? 'bg-white/5 ring-1 ring-white/10 px-4 py-3' : 'bg-slate-900/40 ring-1 ring-white/10 px-6 py-4');

  // dois conjuntos para o loop contínuo (A + B)
  const renderSet = (ariaHidden?: boolean) => (
    <div
      ref={ariaHidden ? undefined : setARef}
      className="flex gap-6 shrink-0"
      aria-hidden={ariaHidden ? 'true' : undefined}
    >
      {logos.map(({ company, logo }, i) => (
        <div key={(ariaHidden ? 'B' : 'A') + i + logo} className={`rounded-2xl ${cardClass} shrink-0`}>
          <img
            src={logo}
            alt={company}
            className={`${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`}
            loading="lazy"
            height={compact ? 40 : 48}
            onLoad={onImgLoad}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className={compact ? '' : 'relative'}>
      {!compact && !hideHeader && (
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-lg font-semibold ${titleClass}`}>{title}</h4>
        </div>
      )}

      <div
        ref={wrapRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden px-1 py-2"
        aria-label="Carrossel de clientes"
      >
        <div
          className={`flex ${autoScroll ? 'marquee' : ''} ${paused ? 'marquee-paused' : ''}`}
          style={
            autoScroll
              ? ({
                  // distância a percorrer e duração do ciclo
                  ['--marquee-distance' as any]: `${distance}px`,
                  animationDuration: `${duration}s`,
                } as React.CSSProperties)
              : undefined
          }
        >
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
    </div>
  );
}
