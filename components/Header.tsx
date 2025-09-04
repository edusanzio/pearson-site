'use client';

import Image from 'next/image';
import { useLang } from './LangContext';
import { t } from '@/lib/dict';

type Lang = 'pt' | 'en' | 'zh';

/* --- SVGs das bandeiras (28x20 viewBox) --- */
function BrazilFlagSVG() {
  return (
    <svg viewBox="0 0 28 20" className="h-5 w-7" aria-hidden="true">
      <rect width="28" height="20" fill="#009B3A" />
      <path d="M14 2 26 10 14 18 2 10 14 2Z" fill="#FFDF00" />
      <circle cx="14" cy="10" r="5.2" fill="#002776" />
      <path d="M9 10.5c3.8-3 7.2-3 10 0" fill="none" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}
function USAFlagSVG() {
  return (
    <svg viewBox="0 0 28 20" className="h-5 w-7" aria-hidden="true">
      <rect width="28" height="20" fill="#fff" />
      <rect y="0" width="28" height="2" fill="#B22234" />
      <rect y="3" width="28" height="2" fill="#B22234" />
      <rect y="6" width="28" height="2" fill="#B22234" />
      <rect y="9" width="28" height="2" fill="#B22234" />
      <rect y="12" width="28" height="2" fill="#B22234" />
      <rect y="15" width="28" height="2" fill="#B22234" />
      <rect y="18" width="28" height="2" fill="#B22234" />
      <rect width="12" height="8" fill="#3C3B6E" />
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={1.5 + c * 2} cy={1 + r * 2} r="0.25" fill="#fff" />
        ))
      )}
    </svg>
  );
}
function ChinaFlagSVG() {
  return (
    <svg viewBox="0 0 28 20" className="h-5 w-7" aria-hidden="true">
      <rect width="28" height="20" fill="#DE2910" />
      <polygon
        points="6,2 7.2,5.4 10.8,5.4 7.9,7.5 9.1,10.8 6,8.8 2.9,10.8 4.1,7.5 1.2,5.4 4.8,5.4"
        fill="#FFDE00"
      />
      <polygon points="10,3.5 10.4,4.6 11.6,4.6 10.6,5.3 11,6.4 10,5.7 9,6.4 9.4,5.3 8.4,4.6 9.6,4.6" fill="#FFDE00" />
      <polygon points="12,5.3 12.4,6.4 13.6,6.4 12.6,7.1 13,8.2 12,7.5 11,8.2 11.4,7.1 10.4,6.4 11.6,6.4" fill="#FFDE00" />
      <polygon points="12,8.2 12.4,9.3 13.6,9.3 12.6,10 13,11.1 12,10.4 11,11.1 11.4,10 10.4,9.3 11.6,9.3" fill="#FFDE00" />
      <polygon points="10,10 10.4,11.1 11.6,11.1 10.6,11.8 11,12.9 10,12.2 9,12.9 9.4,11.8 8.4,11.1 9.6,11.1" fill="#FFDE00" />
    </svg>
  );
}

/* --- Botão de bandeira com destaque verde no hover/ativo --- */
function FlagButton({
  code,
  label,
  svg,
}: {
  code: Lang;
  label: string;
  svg: JSX.Element;
}) {
  const { lang, setLang } = useLang();
  const active = lang === code;

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={() => setLang(code)}
      className={[
        'group relative inline-flex h-8 w-12 items-center justify-center overflow-hidden rounded-lg',
        'bg-white/10 ring-1 ring-white/20 transition-all duration-200 ease-out',
        active
          ? 'ring-2 ring-pearson-green shadow-[0_0_0_3px_rgba(18,148,87,.25)]'
          : 'hover:bg-white/15 hover:ring-pearson-green/60',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-pearson-green',
      ].join(' ')}
    >
      {/* Glow radial verde ao passar o mouse */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(18,148,87,.22) 0%, rgba(18,148,87,.10) 35%, rgba(0,0,0,0) 70%)',
        }}
      />
      {svg}
    </button>
  );
}

export default function Header() {
  const { lang } = useLang();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
      {/* Marca: logo grande com a tagline embaixo */}
      <a href="#home" className="flex items-center gap-0 group">
        <div className="flex flex-col items-start leading-none">
          <Image
            src="/images/pearson.png"
            alt="Pearson — FINAME & BNDES Specialists"
            width={220}
            height={56}
            priority
            className="h-14 md:h-16 w-auto object-contain select-none"
          />

        </div>
      </a>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-9 text-sm">
          <a href="#about" className="hover:text-white/90">{t(lang, 'nav.about')}</a>
          <a href="#finame" className="hover:text-white/90">{t(lang, 'nav.finame')}</a>
          <a href="#services" className="hover:text-white/90">{t(lang, 'nav.services')}</a>
          <a href="#contact" className="hover:text-white/90">{t(lang, 'nav.contact')}</a>
        </nav>

        {/* Bandeiras + WhatsApp */}
        <div className="flex items-center gap-2">
          <div id="langSwitch" className="flex items-center gap-1" role="group" aria-label="Language">
            <FlagButton code="pt" label="Português (Brasil)" svg={<BrazilFlagSVG />} />
            <FlagButton code="en" label="English" svg={<USAFlagSVG />} />
            <FlagButton code="zh" label="中文" svg={<ChinaFlagSVG />} />
          </div>

          <a
            href="https://wa.me/5521997805858"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold
                       bg-pearson-green hover:bg-pearson-green-dark text-white shadow-soft"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M20.52 3.48A11.5 11.5 0 003.2 18.92L2 22l3.19-1.17A11.5 11.5 0 1020.52 3.48zm-8 17.02a9.53 9.53 0 01-4.85-1.33l-.35-.21-2.88 1.05.99-2.98-.23-.37a9.52 9.52 0 1117.72-4.82 9.52 9.52 0 01-9.4 8.66zm5.36-7.19c-.29-.15-1.73-.85-2-.95s-.47-.15-.67.15-.77.95-.94 1.14-.35.22-.64.07a7.77 7.77 0 01-2.29-1.41 8.59 8.59 0 01-1.58-1.96c-.17-.29 0-.45.13-.6.13-.15.29-.37.44-.56.15-.19.2-.33.3-.56.1-.22.05-.41-.02-.56-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.19 0-.49.07-.75.37s-.98.96-.98 2.34 1.01 2.72 1.15 2.9c.15.19 1.98 3.03 4.8 4.25.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.73-.71 1.98-1.39.25-.67.25-1.25.17-1.39-.07-.15-.26-.22-.55-.37z" />
            </svg>
            <span>{t(lang, 'cta.whats') ?? 'WhatsApp'}</span>
          </a>
        </div>
      </div>

      {/* prefetch do geojson (se usar o mapa) */}
      <link rel="preload" as="fetch" href="/maps/br-states.json" crossOrigin="anonymous" />
    </header>
  );
}
