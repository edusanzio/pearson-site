'use client';
import Hero from '@/components/Hero';
import { About, Finame, Services, Cases, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';

export default function Page(){
  return (<main>
    <Hero />
    <About />
    <TeamCarousel title="Nossa equipe" />
    <Finame />
    <Services />
    <Cases />
    <Footprint />
    <Contact />
  </main>);
}
