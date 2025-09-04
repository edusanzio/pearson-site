import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import FeaturedLogos from '@/components/FeaturedLogos';

export default function Page(){
  return (<main>
    <Hero />
    <About />
    <TeamCarousel />
    <Finame />
    <Services />
    <Footprint />
    <Contact />
  </main>);
}
