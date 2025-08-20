'use client';
import Link from 'next/link';
import { useLang } from './LangContext';
import { t } from '@/lib/dict';

export default function Header(){
  const {lang,setLang} = useLang();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-emerald-300">
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm.75 5a.75.75 0 0 1 .75.75V11h3.25a.75.75 0 0 1 0 1.5H13.5v3.25a.75.75 0 0 1-1.5 0V12.5H8.75a.75.75 0 0 1 0-1.5H12V7.75A.75.75 0 0 1 12.75 7Z"/></svg>
          </span>
          <div className="leading-tight">
            <span className="block font-extrabold tracking-tight">Pearson Consultoria</span>
            <span className="block text-xs text-slate-300">FINAME & BNDES Specialists</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-white/90">{t(lang,'nav.about')}</a>
          <a href="#finame" className="hover:text-white/90">{t(lang,'nav.finame')}</a>
          <a href="#services" className="hover:text-white/90">{t(lang,'nav.services')}</a>
          <a href="#cases" className="hover:text-white/90">{t(lang,'nav.cases')}</a>
          <a href="#contact" className="hover:text-white/90">{t(lang,'nav.contact')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select value={lang} onChange={e=>setLang(e.target.value as any)}
              className="appearance-none bg-white/10 ring-1 ring-white/20 text-white text-xs rounded-lg px-3 py-2 pr-8 cursor-pointer">
              <option value="pt">PT-BR</option>
              <option value="en">EN</option>
              <option value="zh">中文</option>
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/></svg>
          </div>
          <a href="https://wa.me/5521997805858" target="_blank" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-soft">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.52 3.48A11.5 11.5 0 003.2 18.92L2 22l3.19-1.17A11.5 11.5 0 1020.52 3.48zm-8 17.02a9.53 9.53 0 01-4.85-1.33l-.35-.21-2.88 1.05.99-2.98-.23-.37a9.52 9.52 0 1117.72-4.82 9.52 9.52 0 01-9.4 8.66zm5.36-7.19c-.29-.15-1.73-.85-2-.95s-.47-.15-.67.15-.77.95-.94 1.14-.35.22-.64.07a7.77 7.77 0 01-2.29-1.41 8.59 8.59 0 01-1.58-1.96c-.17-.29 0-.45.13-.6.13-.15.29-.37.44-.56.15-.19.2-.33.3-.56.1-.22.05-.41-.02-.56-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.19 0-.49.07-.75.37s-.98.96-.98 2.34 1.01 2.72 1.15 2.9c.15.19 1.98 3.03 4.8 4.25.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.73-.71 1.98-1.39.25-.67.25-1.25.17-1.39-.07-.15-.26-.22-.55-.37z"/></svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  )
}
