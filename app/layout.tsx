import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/components/LangContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Pearson Consultoria — FINAME & BNDES Specialists',
  description: 'Líder em credenciamento FINAME e projetos com BNDES. Especialistas em FINAME para fabricantes nacionais e estrangeiros.',
  metadataBase: new URL('https://pearson-consultoria.example')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="font-sans">
        <LangProvider>
          <Header />
          {children}
          <footer className="py-10 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="font-extrabold">Pearson Consultoria</div>
                <div className="text-sm text-slate-400">© {new Date().getFullYear()} Pearson Consultoria — Todos os direitos reservados.</div>
              </div>
              <div className="text-sm text-slate-300">
                <a className="hover:underline" href="https://www.pearsonconsultoria.com.br/" target="_blank">Site atual</a>
                <span className="mx-2">·</span>
                <a className="hover:underline" href="#finame">Saiba mais sobre FINAME</a>
              </div>
            </div>
          </footer>
        </LangProvider>
      </body>
    </html>
  );
}
