'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
export type Lang = 'pt'|'en'|'zh';
type Ctx = { lang: Lang; setLang: (l:Lang)=>void };
const C = createContext<Ctx>({lang:'pt', setLang: ()=>{}});
export function LangProvider({children}:{children:ReactNode}){
  const [lang,setLang] = useState<Lang>('pt');
  useEffect(()=>{
    const saved = window.localStorage.getItem('lang') as Lang | null;
    if(saved) setLang(saved);
  },[]);
  useEffect(()=>{ window.localStorage.setItem('lang', lang); document.documentElement.lang = lang==='zh'?'zh':(lang==='en'?'en':'pt-br'); },[lang]);
  return <C.Provider value={{lang,setLang}}>{children}</C.Provider>;
}
export function useLang(){ return useContext(C); }
