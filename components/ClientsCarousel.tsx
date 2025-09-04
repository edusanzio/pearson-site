'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  wheelMode?: 'off' | 'paged' | 'free';
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
  wheelMode = 'paged',
  
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  // -------- base de logos (modo FS OU modo clients.ts) --------
  const baseLogos = useMemo(() => {
    if (logosFS) {
      const list = featuredOnly
        ? (logosFS.featured?.[lang as 'pt' | 'en' | 'zh'] ?? [])
        : (logosFS.general ?? []);
      return list.map((src) => {
        const name = src.split('/').pop() || src;
        const company = name.replace(/\.(png|jpe?g|webp|svg)$/i, '').replace(/[_-]+/g, ' ');
        return { company, logo: src };
      });
    }

    // modo antigo (clients.ts)
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
      const logo = c.logo!.trim();
      if (!map.has(c.company) && logo) map.set(c.company, logo);
    });

    if (companies?.length) {
      return companies
        .filter((name) => map.has(name))
        .map((name) => ({ company: name, logo: map.get(name)! }));
    }
    return Array.from(map, ([company, logo]) => ({ company, logo }));
  }, [clients, companies, exclude, featuredOnly, logosFS, lang]);

  // -------- embaralhar no cliente p/ evitar hydration mismatch --------
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

  // -------- snap points & wheel discreto (1 card por “tick”) --------
  const [points, setPoints] = useState<number[]>([]);
  const idxRef = useRef(0);
  const wheelLock = useRef(false);

  // calcula pontos para centralizar cada card
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const compute = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const pts = children.map((ch) =>
        Math.max(0, ch.offsetLeft - (el.clientWidth - ch.clientWidth) / 2)
      );
      setPoints(pts);

      // sincroniza índice com scroll atual
      const sl = el.scrollLeft;
      let nearest = 0, best = Infinity;
      pts.forEach((p, i) => {
        const d = Math.abs(p - sl);
        if (d < best) { best = d; nearest = i; }
      });
      idxRef.current = nearest;
    };

    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    // re-run em microtask para garantir bounds certos
    const id = setTimeout(compute, 0);

    return () => { window.removeEventListener('resize', onResize); clearTimeout(id); };
  }, [logos]);

  // wheel: passo discreto (um item por evento)
  useEffect(() => {
  const el = trackRef.current;
  if (!el) return;

  let onWheel: (e: WheelEvent) => void;

  // 1) OFF: bloqueia completamente a roda
  if (wheelMode === 'off') {
    onWheel = (e: WheelEvent) => e.preventDefault();
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as any);
  }

  // 2) FREE: scroll livre, mas desacelerado
  if (wheelMode === 'free') {
    onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 1) return;
      e.preventDefault();
      el.scrollBy({ left: delta * 0.12, behavior: 'smooth' }); // 12% da força
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as any);
  }

  // 3) PAGED: um item por “tick”, com travinha longa
  let locked = false;
  onWheel = (e: WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 5) return;
    e.preventDefault();
    if (locked || points.length === 0) return;

    locked = true;
    const dir = delta > 0 ? 1 : -1;
    idxRef.current = Math.max(0, Math.min(points.length - 1, idxRef.current + dir));
    el.scrollTo({ left: points[idxRef.current], behavior: 'smooth' });

    // deixe bem calmo (aumente se quiser ainda mais devagar)
    setTimeout(() => { locked = false; }, 1000);
  };

  el.addEventListener('wheel', onWheel, { passive: false });
  return () => el.removeEventListener('wheel', onWheel as any);
}, [points, wheelMode]);



  // botões: também 1 item por clique
  const go = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el || points.length === 0) return;
    idxRef.current = Math.max(0, Math.min(points.length - 1, idxRef.current + dir));
    el.scrollTo({ left: points[idxRef.current], behavior: 'smooth' });
  };

  // -------- tema --------
  const titleClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const cardClass =
    theme === 'light'
      ? (compact ? 'bg-white ring-1 ring-slate-200 px-4 py-3' : 'bg-white ring-1 ring-slate-200 px-6 py-4 shadow-sm')
      : (compact ? 'bg-white/5 ring-1 ring-white/10 px-4 py-3' : 'bg-slate-900/40 ring-1 ring-white/10 px-6 py-4');

  return (
    <div className={compact ? '' : 'relative'}>
      {!compact && !hideHeader && (
        <div className="flex items-center justify-between mb-3">
          <h4 className={`text-lg font-semibold ${titleClass}`}>{title}</h4>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="rounded-lg bg-black/5 ring-1 ring-slate-200 px-3 py-1.5 text-sm hover:bg-black/10">‹</button>
            <button onClick={() => go(1)}  className="rounded-lg bg-black/5 ring-1 ring-slate-200 px-3 py-1.5 text-sm hover:bg-black/10">›</button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory overscroll-x-contain scrollbar-none ${
          compact ? 'px-0 py-1' : 'px-1 py-2'
        }`}
        aria-label="Carrossel de clientes"
      >
        {logos.map(({ company, logo }) => (
          <div
            key={logo}
            className={`snap-center snap-always shrink-0 rounded-2xl ${cardClass}`}
            title={company}
          >
            <img
              src={logo}
              alt={company}
              className={`${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`}
              loading="lazy"
              height={compact ? 40 : 48}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
