// page.tsx
import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import FeaturedLogos from '@/components/FeaturedLogos';
import ClientsCarouselFS from '@/components/ClientsCarouselFS'; // ⬅️ adicione isto

export default function Page(){
  return (
    <main>
      <Hero />
      <ClientsCarouselFS
        variant="featured"
        compact
        hideHeader
        theme="dark"
        autoScroll
        autoScrollPxPerSec={12}  // tente 10–14 para leitura confortável
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