// components/ClientsCarouselFS.tsx
import { getFeaturedByLang, getGeneral } from '@/lib/getLogos';
import ClientsCarousel from './ClientsCarousel';

export default async function ClientsCarouselFS({
  variant = 'featured',
  title,
  compact,
  shuffle = true,
  hideHeader,
  theme,
  wheelMode,                // NOVO
}: {
  variant?: 'featured' | 'general';
  title?: string;
  compact?: boolean;
  shuffle?: boolean;
  hideHeader?: boolean;
  theme?: 'dark' | 'light';
  wheelMode?: 'off' | 'paged' | 'free'; // NOVO
}) {
  const featured = await getFeaturedByLang();
  const general = await getGeneral();

  const logosFS = { featured, general };
  const isFeatured = variant === 'featured';

  return (
    <ClientsCarousel
      logosFS={logosFS}
      featuredOnly={isFeatured}
      title={title ?? (isFeatured ? 'Empresas que confiam' : 'Mais clientes')}
      compact={compact ?? !isFeatured}
      shuffle={shuffle}
      hideHeader={hideHeader}
      theme={theme}
      wheelMode={wheelMode}     // NOVO
    />
  );
}
