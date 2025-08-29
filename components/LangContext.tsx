'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'pt' | 'en' | 'zh';

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');

  // 1ª carga: carrega do storage ou do navegador
  useEffect(() => {
    const saved = (localStorage.getItem('lang') as Lang) || null;
    const nav = (navigator.language || '').toLowerCase();
    const initial: Lang = saved ?? (nav.startsWith('pt') ? 'pt' : nav.startsWith('zh') ? 'zh' : 'en');
    setLang(initial);
  }, []);

  // reflete no <html lang> e salva
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh' : lang === 'en' ? 'en' : 'pt-br';
    localStorage.setItem('lang', lang);
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
