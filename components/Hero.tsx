'use client';
import { useEffect } from 'react';
import { useLang } from './LangContext';
import { t } from '@/lib/dict';
import CountUp from '@/components/CountUp';
import { computeWeeklyFixedIncrement  } from '@/lib/weeklyGrowth';

// cresce +2 por semana, às segundas
const clientes = computeWeeklyFixedIncrement({
  base: 432,
  startDate: '2025-09-01',
  perWeek: 2,
});

// cresce +13 por semana, às segundas
const produtos = computeWeeklyFixedIncrement({
  base: 3866,
  startDate: '2025-09-01',
  perWeek: 13,
});

export default function Hero(){
  const {lang} = useLang();
  useEffect(()=>{
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('appear'); } });
    },{threshold:.2});
    document.querySelectorAll('.fade-up, #counterClients').forEach(el=> io.observe(el));
    return ()=> io.disconnect();
  },[]);

  return (
    <section id="home" className="relative min-h-[86vh] grid place-items-center overflow-hidden">
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <iframe
        title="Pearson Consultoria — video hero"
        src="https://www.youtube.com/embed/zv9ivnKmb5c?autoplay=1&mute=1&controls=0&loop=1&playlist=zv9ivnKmb5c&modestbranding=1&playsinline=1"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // cover 16:9 sem depender do Tailwind:
          width: '177.78vh',     // 100vh * 16/9
          height: '100vh',
          minWidth: '100vw',     // garante cobertura quando a tela é mais larga
          minHeight: '56.25vw',  // 100vw * 9/16 — garante cobertura quando é mais alta
          pointerEvents: 'none',
          opacity: 0.7,
          border: 'none',
          display: 'block',
        }}
      />
    </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/75 to-slate-950" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-hero-contrast">
          <span>{t(lang,'hero.title1')}</span><br/>
          <span className="text-pearson-green text-hero-contrast">{t(lang,'hero.title2')}</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-slate-200/90 whitespace-pre-line">{t(lang,'hero.lead')}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#contact" className="rounded-2xl bg-pearson-green text-slate-900 font-semibold px-5 py-3 shadow-soft hover:bg-pearson-green-dark">{t(lang,'hero.primary')}</a>
          <a href="#finame" className="rounded-2xl bg-white/10 ring-1 ring-white/20 px-5 py-3 font-medium hover:bg-white/15">{t(lang,'hero.secondary')}</a>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        
        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-extrabold">1°</div>
          <div className="text-sm text-slate-300">{t(lang,'hero.stat3')}</div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-extrabold">
            <CountUp end={clientes}  />
          </div>
          <div className="text-sm text-slate-300">{t(lang,'hero.stat1')}</div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-extrabold">
            <CountUp end={produtos} />
          </div>
          <div className="text-sm text-slate-300">{t(lang,'hero.stat4')}</div>
        </div>


        <div className="glass rounded-2xl p-4">
          <div className="text-3xl font-extrabold">
            <CountUp end={10} suffix='+' />
          </div>
          <div className="text-sm text-slate-300">{t(lang,'hero.stat2')}</div>
        </div>
        
      
      </div>
    </div>
    </section>
    
  )
}
