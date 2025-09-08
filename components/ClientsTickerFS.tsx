// components/ClientsTickerFS.tsx
import ClientsTicker from './ClientsTicker';
import { getFeaturedByLang, getGeneral } from '@/lib/getLogos';

export default async function ClientsTickerFS({
  variant = 'featured',
  pxPerSec = 12,
  compact = true,
  theme = 'dark',
  shuffle = true,
}: {
  variant?: 'featured' | 'general';
  pxPerSec?: number;
  compact?: boolean;
  theme?: 'dark' | 'light';
  shuffle?: boolean;
}) {
  const featured = await getFeaturedByLang(); // mapeia br->pt, eng->en, ch->zh conforme seu getLogos
  const general = await getGeneral();

  return (
    <ClientsTicker
      logosFS={{ featured, general }}
      featuredOnly={variant === 'featured'}
      pxPerSec={pxPerSec}
      compact={compact}
      theme={theme}
      shuffle={shuffle}
    />
  );
}
