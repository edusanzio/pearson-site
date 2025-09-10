'use client';
import Image from 'next/image';
import { TEAM, type Member, getTeam } from '@/lib/team';
import { useLang } from './LangContext';

type Props = {
  members?: Member[];
};

export default function TeamCarousel({ members = TEAM }: Props) {
  const { lang } = useLang();

  // Usa getTeam(lang) como dicionário por teamKey para localizar as roles
  const localizedMembers: Member[] = (() => {
    const sample = getTeam(lang);
    const roleByKey = new Map(sample.map((m) => [m.teamKey, m.role]));
    return (members || TEAM).map((m) => ({
      ...m,
      role: roleByKey.get(m.teamKey) ?? m.role,
    }));
  })();

  const splitTwoLines = (str: string) => {
    const parts = str.trim().split(/\s+/);
    if (parts.length <= 1) return [str, ''];
    return [parts[0], parts.slice(1).join(' ')];
  };

  return (
    // cola no About acima
    <section id="team" className="pt-2 pb-10 md:pt-0 -mt-2 md:-mt-2">
      <div className="max-w-6xl mx-auto px-6">
        <div
          aria-label="Equipe Pearson"
          className="
            relative flex overflow-x-auto snap-x snap-mandatory scrollbar-none
            touch-pan-x                     /* permite pan horizontal no mobile */
            justify-start md:justify-center /* começa à esquerda no mobile */
            pl-4 pr-4 gap-0                 /* espaçamento real no mobile */
            md:[&>*:not(:first-child)]:-ml-6
            md:[&>*:not(:last-child)]:-mr-6 /* mantém o overlap só no md+ */
          "
          style={{ WebkitOverflowScrolling: 'touch' }}  // momentum scroll no iOS
        >
          {localizedMembers.map((m) => (
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
                    filter:
                      'drop-shadow(0 0 12px rgba(255,255,255,0.22)) drop-shadow(0 0 26px rgba(255,255,255,0.14))',
                  }}
                />
                {/* cópia desfocada só na base (super leve) */}
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

              <style jsx>{`
                figure:hover .photo {
                  filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.3))
                    drop-shadow(0 0 36px rgba(255, 255, 255, 0.2));
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
