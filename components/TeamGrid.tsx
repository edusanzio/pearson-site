import Image from 'next/image';
import { TEAM, type Member } from '@/lib/team';

export default function TeamGrid({ members = TEAM, title = 'Nossa equipe' }: {members?: Member[]; title?: string}) {
  return (
    <section id="team" className="relative py-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
          {members.map((m) => (
            <article key={m.name} className="rounded-2xl bg-[#284189]/40 ring-1 ring-white/10 p-3 text-center">
              <div className="relative mx-auto w-full aspect-[3/4] overflow-hidden rounded-xl bg-white/5">
                <Image src={m.photo} alt={m.name} fill sizes="140px" className="object-contain" />
              </div>
              <div className="mt-3 leading-tight">
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs text-slate-300">{m.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
