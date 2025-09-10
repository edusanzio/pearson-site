import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import ClientsTickerFS from '@/components/ClientsTickerFS';

export default function Page(){
  return (
    <main>
      <Hero />
      <ClientsTickerFS
        variant="featured"
        overlay
        overlayClass="-mt-[100px] md:-mt-[120px] lg:-mt-[120px] z-30"
        whiteBg
        compact={false}
        bare
        order="alpha"
        pxPerSecTop={15}
        pxPerSecBottom={18}
        gapY={2}
        fullBleed
      />

      <About />
      <TeamCarousel />
      <Finame />
      <Services />
      <Footprint />
      <Contact />
    </main>
  );
}
