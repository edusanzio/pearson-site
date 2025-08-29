'use client';

import { useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoGraticule10 } from 'd3-geo';
import type { Client } from '@/lib/clients';

const GEO_STATES = '/maps/br-states.json';

type Props = {
  clients: Client[];
  width?: number;
  height?: number;
  choropleth?: boolean;
};

export default function BrazilClientsMap({
  clients,
  width = 900,
  height = 560,
  choropleth = false,
}: Props) {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // grade (graticule) como GeoJSON
  const graticuleFC = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [{ type: 'Feature', properties: {}, geometry: geoGraticule10() as any }],
    }),
    []
  );

  // Agrupa clientes por cidade (mesmo ponto)
  const grouped = useMemo(() => {
    const m = new Map<string, { lat: number; lon: number; items: Client[] }>();
    clients.forEach((c) => {
      const k = `${c.city}-${c.state}`;
      if (!m.has(k)) m.set(k, { lat: c.lat, lon: c.lon, items: [] });
      m.get(k)!.items.push(c);
    });
    return [...m.values()];
  }, [clients]);

  // Contagem por UF (choropleth opcional)
  const byUF = useMemo(() => {
    const m = new Map<string, number>();
    clients.forEach((c) => m.set(c.state, (m.get(c.state) ?? 0) + 1));
    const max = Math.max(1, ...m.values());
    return { m, max };
  }, [clients]);

  const fillForUF = (uf?: string) => {
    if (!choropleth || !uf) return 'rgba(40,65,137,0.75)'; // #284189
    const count = byUF.m.get(uf) ?? 0;
    const alpha = 0.55 + 0.35 * (count / byUF.max); // 0.55–0.90
    return `rgba(40,65,137,${alpha.toFixed(2)})`;
  };

  const getUF = (p: any): string | undefined =>
    p?.sigla ?? p?.UF ?? p?.uf ?? p?.abbr ?? p?.code ?? p?.name;

  return (
    <div ref={rootRef} className="relative">
      {/* spotlight por trás */}
      <div className="pointer-events-none absolute inset-x-0 -top-8 mx-auto h-64 w-[min(100%,980px)]
      rounded-[999px] opacity-60
      bg-[radial-gradient(ellipse_at_center,_rgba(40,65,137,0.20)_0%,_rgba(2,6,23,0)_70%)]" />

      <ComposableMap
        width={width}
        height={600} // antes 560 (mais altura = mais respiro)
        projection="geoMercator"
        projectionConfig={{ center: [-54, -14], scale: 830 }} // antes scale: 900
        style={{ width: '100%', height: 'auto' }}
      >
        {/* GRATICULE (por baixo dos estados) */}
        <Geographies geography={graticuleFC}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={0.8}
                style={{
                  default: {
                    outline: 'none',
                    vectorEffect: 'non-scaling-stroke',
                  },
                  hover: { outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* ESTADOS (divisões internas, sem “borda externa”) */}
        <Geographies geography={GEO_STATES}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const uf = getUF(geo.properties);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillForUF(uf)}
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth={0.6}
                  style={{
                    default: {
                      outline: 'none',
                      strokeLinejoin: 'round',
                      strokeLinecap: 'round',
                      vectorEffect: 'non-scaling-stroke',
                    },
                    hover: {
                      outline: 'none',
                      fill: 'rgba(40,65,137,0.95)',
                      strokeLinejoin: 'round',
                      strokeLinecap: 'round',
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* MARCADORES */}
        {grouped.map(({ lat, lon, items }, idx) => (
          <Marker
            key={idx}
            coordinates={[lon, lat]}
            onMouseEnter={(e) => {
              const text = items
                .map(
                  (i: { company: any; city: any; state: any; }) =>
                    `<b>${i.company}</b><br/><span class="text-slate-300">${i.city}/${i.state}</span>`
                )
                .join('<hr class="my-1 border-white/10"/>');
              setTip({ x: e.clientX, y: e.clientY, text });
            }}
            onMouseMove={(e) => setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t))}
            onMouseLeave={() => setTip(null)}
          >
            <circle r={8} className="opacity-0 group-hover:opacity-25 group-hover:animate-ping" fill="#129457" />
            <circle r={6.8} fill="rgba(18,148,87,0.25)" />
            <circle r={3.2} fill="#129457" stroke="white" strokeWidth={1} />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-50 max-w-xs rounded-lg bg-slate-900/90 ring-1 ring-white/10 px-3 py-2 text-xs text-slate-100 shadow-lg"
          style={{ left: tip.x + 12, top: tip.y + 12 }}
          dangerouslySetInnerHTML={{ __html: tip.text }}
        />
      )}
    </div>
  );
}
