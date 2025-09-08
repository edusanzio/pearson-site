'use client';
import dynamic from 'next/dynamic';
import { t } from '@/lib/dict';
import { useLang } from './LangContext';
import { CLIENTS } from '@/lib/clients';
import Image from 'next/image';

// importa os componentes de forma dinâmica (sem SSR)
const BrazilClientsMap = dynamic(() => import('./BrazilClientsMap'), { ssr: false });
//const ClientsCarousel  = dynamic(() => import('./ClientsCarousel'),  { ssr: false });

export function About(){
  const {lang}=useLang();

  return (
    <section
      id="about"
      className="relative py-5 border-y border-white/10 overflow-hidden"
    >
      {/* Logo como fundo */}
      <Image
        src="/images/pearson.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="
          absolute inset-0 z-0 object-contain
          sm:object-left md:object-center
          opacity-15 pointer-events-none
        "
        // dica: se quiser garantir carregamento, pode usar priority
        // priority
      />

      {/* Overlays para leitura */}
      <div className="absolute inset-0 z-10 bg-slate-950/35" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/15 via-transparent to-slate-950/35" />

      <div className="relative z-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'about.title')}</h2>
            <p className="mt-4 text-slate-300">{t(lang,'about.p1')}</p>
            <p className="mt-3 text-slate-300">{t(lang,'about.p2')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag1')}</span>
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag2')}</span>
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag3')}</span>
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag4')}</span>
            </div>
          </div>

          {/* LADO DIREITO — feature cards empilhados */}
          <div className="fade-up">
            <div className="grid grid-cols-1 gap-5">
              {/* Card: O que entregamos */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5">
                <div className="rounded-2xl bg-slate-900/60 backdrop-blur
                                ring-1 ring-white/10 p-5
                                transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 grid place-items-center rounded-lg
                                    bg-pearson-green/15 text-pearson-green
                                    ring-1 ring-pearson-green/30">
                      {/* ícone caixa/entrega */}
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M21 8.5V17a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 17V8.5l8 4.57V21l7-4V9.07L21 8.5ZM12 2l9 5-9 5-9-5 9-5Z"/>
                      </svg>
                    </span>
                    <h3 className="font-semibold">{t(lang,'about.high1.t')}</h3>
                  </div>

                  <ul className="mt-4 space-y-2 text-slate-200/90">
                    {(['i1','i2','i3','i4'] as const).map(key => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-green/25
                                        ring-1 ring-pearson-green/40 text-pearson-green
                                        inline-grid place-items-center">
                          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                            <path d="M16.7 5.29a1 1 0 0 1 .01 1.42l-7.1 7.1a1 1 0 0 1-1.42 0L3.3 9.42a1 1 0 0 1 1.4-1.43l3.08 3.08 6.4-6.4a1 1 0 0 1 1.42 0Z"/>
                          </svg>
                        </span>
                        <span>{t(lang,`about.high1.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card: Resultados para você */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5">
                <div className="rounded-2xl bg-slate-900/60 backdrop-blur
                                ring-1 ring-white/10 p-5
                                transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 grid place-items-center rounded-lg
                                    bg-pearson-blue/20 text-pearson-blue
                                    ring-1 ring-pearson-blue/35">
                      {/* ícone alvo/resultado */}
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6Zm1-4v6h6a1 1 0 1 0 0-2h-4V2a1 1 0 1 0-2 0Z"/>
                      </svg>
                    </span>
                    <h3 className="font-semibold">{t(lang,'about.high2.t')}</h3>
                  </div>

                  <ul className="mt-4 space-y-2 text-slate-200/90">
                    {(['i1','i2','i3'] as const).map(key => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-blue/25
                                        ring-1 ring-pearson-blue/35 text-pearson-blue
                                        inline-grid place-items-center">
                          <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
                            <path d="M11 1 3 11h5l-1 8 8-10h-5l1-8Z"/>
                          </svg>
                        </span>
                        <span>{t(lang,`about.high2.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div
    aria-hidden
    className="pointer-events-none absolute bottom-0 left-0 right-0 h-6
               bg-gradient-to-b from-transparent to-[rgb(2,6,23)]/100 -z-10"
  />
    </section>
  );
}

export function Finame() {
  const { lang } = useLang();

  return (
    <section
      id="finame"
      className="relative py-24 border-y border-white/10 overflow-hidden"
    >
      {/* BG */}
      <Image
        src="/images/bndes.jpg"
        alt=""
        fill
        sizes="100vw"
        priority={false}
        className="absolute inset-0 z-0 object-cover object-center opacity-40"
        aria-hidden
      />

      {/* overlays p/ contraste */}
      <div className="absolute inset-0 z-10 bg-slate-950/45" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950" />

      {/* Conteúdo */}
      <div className="relative z-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Lado esquerdo: texto + 2 feature cards coloridos */}
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {t(lang, 'finame.title')}
            </h2>
            <p className="mt-4 text-slate-200/90">{t(lang, 'finame.p2')}</p>
            <p className="mt-3 text-slate-200/90">{t(lang, 'finame.p1')}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              {/* Como funciona */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-pearson-blue/40 to-pearson-green/40">
                <div className="rounded-2xl bg-slate-900/60 backdrop-blur ring-1 ring-white/10 p-5 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 grid place-items-center rounded-lg bg-pearson-blue/20 text-pearson-blue ring-1 ring-pearson-blue/35">
                      {/* ícone fluxo */}
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 6h10a3 3 0 0 1 0 6H7a3 3 0 1 0 0 6h10v2H7a5 5 0 1 1 0-10h10a1 1 0 1 0 0-2H7V6Z"/></svg>
                    </span>
                    <h3 className="font-semibold">{t(lang,'finame.how.t')}</h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">
                    {t(lang,'finame.how.d')}
                  </p>
                </div>
              </div>

              {/* Benefícios */}
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-pearson-green/45 to-pearson-blue/35">
                <div className="rounded-2xl bg-slate-900/60 backdrop-blur ring-1 ring-white/10 p-5 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 grid place-items-center rounded-lg bg-pearson-green/20 text-pearson-green ring-1 ring-pearson-green/35">
                      {/* ícone medalha */}
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a6 6 0 1 0 6 6A6 6 0 0 0 12 2Zm0 16 4 4 1-5 5-1-4-4-5 1-1 5Z"/></svg>
                    </span>
                    <h3 className="font-semibold">{t(lang,'finame.benefits.t')}</h3>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200/90">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-green/25 ring-1 ring-pearson-green/40 inline-grid place-items-center text-pearson-green">
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.1 7a1 1 0 0 1-1.4 0L3.3 9.4a1 1 0 1 1 1.4-1.4l3.1 3.1 6.4-6.4a1 1 0 0 1 1.5 0Z"/></svg>
                      </span>
                      {t(lang,'finame.benefits.i1')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-green/25 ring-1 ring-pearson-green/40 inline-grid place-items-center text-pearson-green">
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.1 7a1 1 0 0 1-1.4 0L3.3 9.4a1 1 0 1 1 1.4-1.4l3.1 3.1 6.4-6.4a1 1 0 0 1 1.5 0Z"/></svg>
                      </span>
                      {t(lang,'finame.benefits.i2')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-green/25 ring-1 ring-pearson-green/40 inline-grid place-items-center text-pearson-green">
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.1 7a1 1 0 0 1-1.4 0L3.3 9.4a1 1 0 1 1 1.4-1.4l3.1 3.1 6.4-6.4a1 1 0 0 1 1.5 0Z"/></svg>
                      </span>
                      {t(lang,'finame.benefits.i3')}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-4 w-4 rounded-full bg-pearson-green/25 ring-1 ring-pearson-green/40 inline-grid place-items-center text-pearson-green">
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor"><path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.1 7a1 1 0 0 1-1.4 0L3.3 9.4a1 1 0 1 1 1.4-1.4l3.1 3.1 6.4-6.4a1 1 0 0 1 1.5 0Z"/></svg>
                      </span>
                      {t(lang,'finame.benefits.i4')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Lado direito: timeline colorida dos 4 passos */}
          <div className="fade-up">
            <h3 className="text-xl font-bold">{t(lang,'finame.steps.t')}</h3>

            <ol className="mt-5 space-y-5">
              {/* Step 1 */}
              <li className="relative pl-10">
                {/* conector vertical */}
                <span className="absolute left-3 top-9 bottom-[-20px] w-[2px] bg-gradient-to-b from-pearson-green/60 to-pearson-blue/60" aria-hidden />
                {/* marcador */}
                <span className="absolute left-0 top-6 h-6 w-6 rounded-full bg-gradient-to-br from-pearson-green to-pearson-blue ring-4 ring-slate-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                <div className="rounded-2xl bg-slate-900/55 p-5 ring-1 ring-white/10 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="font-semibold">{t(lang,'finame.steps.i1.t')}</div>
                  <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i1.d')}</div>
                </div>
              </li>

              {/* Step 2 */}
              <li className="relative pl-10">
                <span className="absolute left-3 top-9 bottom-[-20px] w-[2px] bg-gradient-to-b from-pearson-green/60 to-pearson-blue/60" aria-hidden />
                <span className="absolute left-0 top-6 h-6 w-6 rounded-full bg-gradient-to-br from-pearson-green to-pearson-blue ring-4 ring-slate-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                <div className="rounded-2xl bg-slate-900/55 p-5 ring-1 ring-white/10 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="font-semibold">{t(lang,'finame.steps.i2.t')}</div>
                  <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i2.d')}</div>
                </div>
              </li>

              {/* Step 3 */}
              <li className="relative pl-10">
                <span className="absolute left-3 top-9 bottom-[-20px] w-[2px] bg-gradient-to-b from-pearson-green/60 to-pearson-blue/60" aria-hidden />
                <span className="absolute left-0 top-6 h-6 w-6 rounded-full bg-gradient-to-br from-pearson-green to-pearson-blue ring-4 ring-slate-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                <div className="rounded-2xl bg-slate-900/55 p-5 ring-1 ring-white/10 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="font-semibold">{t(lang,'finame.steps.i3.t')}</div>
                  <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i3.d')}</div>
                </div>
              </li>

              {/* Step 4 (sem conector final) */}
              <li className="relative pl-10">
                <span className="absolute left-0 top-6 h-6 w-6 rounded-full bg-gradient-to-br from-pearson-green to-pearson-blue ring-4 ring-slate-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]" />
                <div className="rounded-2xl bg-slate-900/55 p-5 ring-1 ring-white/10 transition hover:bg-slate-900/70 hover:-translate-y-0.5">
                  <div className="font-semibold">{t(lang,'finame.steps.i4.t')}</div>
                  <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i4.d')}</div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { lang } = useLang();

  return (
    <section id="services" className="py-24 bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Título */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t(lang, 'services.title')}
          </h2>
          <p className="mt-3 text-slate-600">{t(lang, 'services.lead')}</p>
        </div>

        {/* Cards (sem gradiente) */}
        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { t: t(lang, 'services.s1.t'), d: t(lang, 'services.s1.d'), tone: 'blue' },
            { t: t(lang, 'services.s2.t'), d: t(lang, 'services.s2.d'), tone: 'green' },
            { t: t(lang, 'services.s3.t'), d: t(lang, 'services.s3.d'), tone: 'blue' },
            { t: t(lang, 'services.s4.t'), d: t(lang, 'services.s4.d'), tone: 'green' },
          ].map(({ t: title, d, tone }, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span
                  className={[
                    'h-10 w-10 grid place-items-center rounded-xl ring-1',
                    tone === 'blue'
                      ? 'bg-pearson-blue/10 text-pearson-blue ring-pearson-blue/20'
                      : 'bg-pearson-green/10 text-pearson-green ring-pearson-green/20',
                  ].join(' ')}
                  aria-hidden
                >
                  {/* ícone genérico */}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M5 6h14v2H5zm0 5h14v2H5zm0 5h14v2H5z" />
                  </svg>
                </span>
                <div className="text-lg font-bold">{title}</div>
              </div>
              <p className="mt-2 text-sm text-slate-700">{d}</p>
            </div>
          ))}
        </div>

        {/* Destaque inferior (quadro claro) */}
        <div className="mt-10 rounded-3xl bg-white ring-1 ring-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span
                className="h-11 w-11 grid place-items-center rounded-2xl bg-pearson-green/10 text-pearson-green ring-1 ring-pearson-green/20"
                aria-hidden
              >
                {/* ícone de correlação */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M5 3h2v18H5zM17 3h2v18h-2zM9 8h6v2H9zm0 6h6v2H9z" />
                </svg>
              </span>

              <p className="text-base md:text-lg text-slate-800 max-w-4xl">
                <span className="font-semibold text-pearson-blue">
                  {t(lang,'services.highlight.lead') || 'Temos um sistema altamente eficaz'}
                </span>{' '}
                {t(lang,'services.highlight.rest') ||
                  'e uma equipe muito experiente para correlacionar as notas fiscais de compras de componentes do seu produto/sistema com a composição real do seu produto.'}
              </p>
            </div>

            <a
              href="#contact"
              className="shrink-0 rounded-2xl px-5 py-3 font-semibold bg-pearson-green text-white hover:bg-pearson-green-dark shadow-soft"
            >
              {t(lang,'hero.primary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


export function Footprint() {
  const { lang } = useLang();

  return (
    <section id="footprint" className="py-24 bg-slate-900/60 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
          Onde atuamos
        </h3>
        <p className="text-slate-300 mb-6">
          Cidades com clientes Pearson — passe o mouse para ver a empresa e o que fabrica.
        </p>

        <div className="p-0 bg-transparent border-0 ring-0 shadow-none rounded-none">
          <BrazilClientsMap clients={CLIENTS} />
        </div>    
      </div>
    </section>
  );
}

export function Contact(){
  const {lang}=useLang();
  function openMailer(e:React.FormEvent){
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const n = (form.querySelector('#fName') as HTMLInputElement).value.trim();
    const c = (form.querySelector('#fCompany') as HTMLInputElement).value.trim();
    const em = (form.querySelector('#fEmail') as HTMLInputElement).value.trim();
    const m = (form.querySelector('#fMsg') as HTMLTextAreaElement).value.trim();
    const subject = encodeURIComponent('Projeto FINAME — ' + c);
    const body = encodeURIComponent(`Nome: ${n}\nEmpresa: ${c}\nE-mail: ${em}\n\nMensagem:\n${m}`);
    window.location.href = `mailto:contato@pearsonconsultoria.com.br?subject=${subject}&body=${body}`;
  }
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'contact.title')}</h2>
            <p className="mt-3 text-slate-300">{t(lang,'contact.lead')}</p>
            <div className="mt-6 space-y-3 text-slate-200">
              <div><span className="font-semibold">E-mail:</span> <a className="hover:underline" href="mailto:contato@pearsonconsultoria.com.br">contato@pearsonconsultoria.com.br</a></div>
              <div><span className="font-semibold">{t(lang,'contact.phone')}</span> <a className="hover:underline" href="tel:+552136785972">+55 21 3678-5972</a> · <a className="hover:underline" href="tel:+5521997805858">+55 21 99780-5858</a></div>
              <div><span className="font-semibold">{t(lang,'contact.city')}</span></div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="https://wa.me/5521997805858" target="_blank" className="rounded-2xl bg-pearson-green text-slate-900 font-semibold px-5 py-3 shadow-soft hover:bg-pearson-green-dark">{t(lang,'contact.whats')}</a>
              <a href="mailto:contato@pearsonconsultoria.com.br?subject=Projeto%20FINAME%20-%20Pearson%20Consultoria" className="rounded-2xl bg-white/10 ring-1 ring-white/20 px-5 py-3 font-medium hover:bg-white/15">{t(lang,'contact.email')}</a>
            </div>
          </div>
          <form onSubmit={openMailer} className="fade-up rounded-3xl card p-6">
            <h3 className="text-xl font-bold">{t(lang,'contact.form.title')}</h3>
            <div className="mt-4 grid gap-4">
              <label className="block">
                <span className="text-sm text-slate-300">{t(lang,'contact.form.name')}</span>
                <input id="fName" required className="mt-1 w-full rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">{t(lang,'contact.form.company')}</span>
                <input id="fCompany" required className="mt-1 w-full rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">{t(lang,'contact.form.email')}</span>
                <input id="fEmail" type="email" required className="mt-1 w-full rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">{t(lang,'contact.form.message')}</span>
                <textarea id="fMsg" rows={4} className="mt-1 w-full rounded-xl bg-white/10 ring-1 ring-white/20 px-3 py-2" />
              </label>
              <button className="rounded-2xl bg-pearson-green text-slate-900 font-semibold px-5 py-3 shadow-soft hover:bg-pearson-green-dark">{t(lang,'contact.form.cta')}</button>
            </div>
            <p className="mt-3 text-xs text-slate-400">{t(lang,'contact.disclaimer')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
