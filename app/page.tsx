import Hero from '@/components/Hero';
import { About, Finame, Services, Footprint, Contact } from '@/components/Sections';
import TeamCarousel from '@/components/TeamCarousel';
import ClientsTickerFS from '@/components/ClientsTickerFS';

export default function Page(){
  return (
    <main>
      <Hero />
      <ClientsTickerFS
        variant="featured"           // usa os logos de destaque do FS (public/logos/destaque/{br|eng|ch}) conforme o idioma
        overlay={true}               // ativa a “sobreposição” do bloco sobre o Hero (wrap com z-10 e margem negativa)
        overlayClass="-mt-8 md:-mt-12" // classes Tailwind que sobem o bloco: -mt-8 no mobile e -mt-12 em telas md+
        whiteBg={true}               // coloca uma faixa com fundo branco, borda/sombra atrás das duas linhas de logos
        compact={false}              // logos maiores (ex.: h-12). Se true, usa tamanhos menores (h-8/h-10)
        bare={true}                  // exibe só as imagens (sem cartões/caixinhas ao redor), com espaçamento lateral
        order="alpha"                // ordena alfabeticamente (pelo nome do arquivo). Use "as-is" para manter a ordem do FS
        pxPerSecTop={10}             // velocidade da linha de cima em pixels/segundo (menor = mais devagar)
        pxPerSecBottom={11}          // velocidade da linha de baixo em pixels/segundo (pode ser diferente da de cima)
        gapY={8}                     // espaço vertical entre as duas linhas (em pixels)
        fullBleed={true}
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
