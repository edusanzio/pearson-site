'use client';
import Hero from '@/components/Hero';
import { About, Finame, Services, Cases, Contact } from '@/components/Sections';

export default function Page(){
  return (<main>
    <Hero />
    <About />
    <Finame />
    <Services />
    <Cases />
    <Contact />
  </main>);
}
