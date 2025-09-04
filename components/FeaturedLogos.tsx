import ClientsCarouselFS from './ClientsCarouselFS';

export default async function FeaturedLogos() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <ClientsCarouselFS
          variant="featured"
          theme="light"
          hideHeader
          shuffle
          wheelMode="off"   // <<< roda desativada (só arrastar e botões)
        />
      </div>
    </section>
  );
}