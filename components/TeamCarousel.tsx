'use client';
import Image from 'next/image';
import { TEAM, type Member } from '@/lib/team';
import { useRef } from 'react';

type Props = {
  members?: Member[];
  title?: string;
  autoPlay?: boolean;
  speedMs?: number;
};

export default function TeamCarousel({
  members = TEAM,
  title = 'Nossa equipe',
  autoPlay = false,
  speedMs = 3500,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(520, el.clientWidth * 0.85);
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const splitTwoLines = (str: string) => {
    const parts = str.trim().split(/\s+/);
    if (parts.length <= 1) return [str, ''];
    return [parts[0], parts.slice(1).join(' ')];
  };

  return (
    <section id="team" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-sm hover:bg-white/15"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => scroll(1)}
              className="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-1.5 text-sm hover:bg-white/15"
              aria-label="Próximo"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          aria-label="Carrossel da equipe"
          className="
            relative flex overflow-x-auto snap-x snap-mandatory scrollbar-none
            justify-center
            pl-2 pr-2 gap-2
            [&>*:not(:first-child)]:-ml-4 md:[&>*:not(:first-child)]:-ml-6
            [&>*:not(:last-child)]:-mr-4  md:[&>*:not(:last-child)]:-mr-6
          "
        >
          {members.map((m) => (
            <figure
              key={m.name}
              className="
                group relative snap-start shrink-0 w-[140px] sm:w-[160px] text-center
                z-0 hover:z-40
              "
            >
              {/* retrato: zoom + edge glow branco + fade no rodapé */}
              <div
                className="
                  relative mx-auto h-[190px] sm:h-[210px] z-10
                  transition-transform duration-300 ease-out will-change-transform
                  group-hover:scale-[1.10]
                "
              >
                {/* imagem principal com fade curtinho na base */}
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 160px"
                  className="object-contain select-none photo"
                  draggable={false}
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(to bottom, black 0%, black 96%, transparent 100%)',
                    maskImage:
                      'linear-gradient(to bottom, black 0%, black 96%, transparent 100%)',
                    // edge glow branco atrás do recorte (funciona bem com PNG)
                    filter:
                      'drop-shadow(0 0 10px rgba(255,255,255,0.18)) drop-shadow(0 0 20px rgba(255,255,255,0.12))',
                  }}
                />

                {/* cópia desfocada só na base (super leve) para matar a “linha” */}
                <Image
                  src={m.photo}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 160px"
                  className="object-contain pointer-events-none"
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, black 88%)',
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, black 88%)',
                    filter: 'blur(6px)',
                    transform: 'translateY(4px) scaleY(0.92)',
                    opacity: 0.16,
                    zIndex: 5,
                  }}
                />
              </div>

              {/* intensifica o edge glow no hover */}
              <style jsx>{`
                figure:hover .photo {
                  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.26))
                          drop-shadow(0 0 26px rgba(255, 255, 255, 0.18));
                }
              `}</style>

              {/* legendas em duas linhas */}
              <figcaption className="mt-2 leading-tight relative z-10">
                {(() => {
                  const [nameL1, nameL2] = splitTwoLines(m.name);
                  const [roleL1, roleL2] = splitTwoLines(m.role);
                  return (
                    <>
                      <div className="font-semibold">
                        <span className="block">{nameL1}</span>
                        {nameL2 && <span className="block">{nameL2}</span>}
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        <span className="block">{roleL1}</span>
                        {roleL2 && <span className="block">{roleL2}</span>}
                      </div>
                    </>
                  );
                })()}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
