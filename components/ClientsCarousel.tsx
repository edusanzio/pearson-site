'use client';
import { useMemo, useRef } from 'react';
import type { Client } from '@/lib/clients';
import { useLang } from './LangContext';

type Props = {
  clients: Client[];
  title?: string;
  compact?: boolean;
  companies?: string[]; // mostra só essas (ordem respeitada)
  exclude?: string[];   // remove essas
  featuredOnly?: boolean; // usa featuredIn por idioma
};

export default function ClientsCarousel({
  clients,
  title = 'Alguns clientes',
  compact = false,
  companies,
  exclude,
  featuredOnly = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  const logos = useMemo(() => {
    const hasLogo = (c: Client) => typeof c.logo === 'string' && c.logo.trim().length > 0;

    let arr = clients;

    // 1) somente destacados no idioma atual (se pedido)
    if (featuredOnly) arr = arr.filter(c => c.featuredIn?.includes(lang));

    // 2) excluir empresas específicas
    if (exclude?.length) {
      const ex = new Set(exclude);
      arr = arr.filter(c => !ex.has(c.company));
    }

    // 3) manter apenas quem tem logo
    arr = arr.filter(hasLogo);

    // 4) dedup por empresa (pega o primeiro logo disponível)
    const map = new Map<string, string>();
    arr.forEach(c => {
      const logo = c.logo!.trim();
      if (!map.has(c.company) && logo) map.set(c.company, logo);
    });

    // 5) se "companies" veio, filtra/ordena por ela (e só entra quem tem logo)
    if (companies?.length) {
      return companies
        .filter(name => map.has(name))
        .map(name => ({ company: name, logo: map.get(name)! }));
    }

    // 6) padrão: todos os restantes com logo
    return Array.from(map, ([company, logo]) => ({ company, logo }));
  }, [clients, companies, exclude, featuredOnly, lang]);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(520, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div className={compact ? '' : 'relative'}>
      {!compact && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-slate-100">{title}</h4>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="rounded-lg bg-white/10 ring-1 ring-white/20 px-3 py-1.5 text-sm hover:bg-white/15">‹</button>
            <button onClick={() => scroll(1)}  className="rounded-lg bg-white/10 ring-1 ring-white/20 px-3 py-1.5 text-sm hover:bg-white/15">›</button>
          </div>
        </div>
      )}

      <div
        ref={trackRef}
        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none ${compact ? 'px-0 py-1' : 'px-1 py-2'}`}
        aria-label="Carrossel de clientes"
      >
        {logos.map(({ company, logo }) => (
          <div key={company} className={`snap-start shrink-0 rounded-2xl ring-1 ring-white/10 ${compact ? 'bg-white/5 px-4 py-3' : 'bg-slate-900/40 px-6 py-4'}`} title={company}>
            <img src={logo} alt={company} className={`${compact ? 'h-8 md:h-10' : 'h-12'} w-auto object-contain opacity-95`} loading="lazy" height={compact ? 40 : 48} />
          </div>
        ))}
      </div>
    </div>
  );
}
