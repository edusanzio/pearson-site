import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import ClientsTickerFS from '@/components/ClientsTickerFS';

export default function Page(){
  return (
    <main>
      <Hero />

      {/* carrossel abaixo do hero */}
      <div className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <ClientsTickerFS
            variant="featured"
            pxPerSec={50}
            theme="light"
            shuffle
            compact
          />
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
