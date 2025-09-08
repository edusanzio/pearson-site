import ClientsTicker from './ClientsTicker';
import { getFeaturedByLang, getGeneral } from '@/lib/getLogos';

export default async function ClientsTickerFS({
  variant = 'featured',
  pxPerSec = 12,
  compact = true,
  theme = 'dark',
  shuffle = true,
  direction = 'left',
  delaySec = 0,
  bare = false,
  seed,           // 👈 NOVO
  reverse,        // 👈 NOVO
}: {
  variant?: 'featured' | 'general';
  pxPerSec?: number;
  compact?: boolean;
  theme?: 'dark' | 'light';
  shuffle?: boolean;
  direction?: 'left' | 'right';
  delaySec?: number;
  bare?: boolean;
  seed?: number;        // 👈 NOVO
  reverse?: boolean;    // 👈 NOVO
}) {
  const featured = await getFeaturedByLang();
  const general = await getGeneral();

  return (
    <ClientsTicker
      logosFS={{ featured, general }}
      featuredOnly={variant === 'featured'}
      pxPerSec={pxPerSec}
      compact={compact}
      theme={theme}
      shuffle={shuffle}
      direction={direction}
      delaySec={delaySec}
      bare={bare}
      seed={seed}            // 👈
      reverse={reverse}      // 👈
    />
  );
}