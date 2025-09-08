import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import ClientsTickerFS from '@/components/ClientsTickerFS';

export default function Page(){
  return (
    <main>
      <Hero />

      {/* faixa branca levemente sobreposta ao Hero */}
      <div className="relative z-10 -mt-8 md:-mt-12">
        <div className="bg-white ring-1 ring-slate-200/70 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            {/* Linha 1: ordem A (seed 137), indo para a esquerda */}
            <ClientsTickerFS
              variant="featured"
              pxPerSec={30}
              compact={false}
              theme="light"
              shuffle={false}   // ignorado porque passaremos seed
              direction="left"
              delaySec={0}
              bare
              seed={137}        // 👈 fixa a ordem
              reverse={false}
            />

            {/* Linha 2: mesma ordem A, porém invertida (B = A ao contrário), indo para a direita */}
            <div className="mt-2">
              <ClientsTickerFS
                variant="featured"
                pxPerSec={30}
                compact={false}
                theme="light"
                shuffle={false}
                direction="right"
                delaySec={-2}
                bare
                seed={137}       // 👈 mesma seed
                reverse          // 👈 inverte a ordem
              />
            </div>
          </div>
        </div>
      </div>

      <About />
      <TeamCarousel />
      <Finame />
      <Services />
      <Footprint />
      <Contact />
    </main>
  );
}
