'use client';
import { t } from '@/lib/dict';
import { useLang } from './LangContext';

export function About(){
  const {lang}=useLang();
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'about.title')}</h2>
            <p className="mt-4 text-slate-300">{t(lang,'about.p1')}</p>
            <p className="mt-3 text-slate-300">{t(lang,'about.p2')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag1')}</span>
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag2')}</span>
              <span className="text-xs rounded-full border border-white/20 px-3 py-1">{t(lang,'about.tag3')}</span>
            </div>
          </div>
          <div className="fade-up">
            <div className="rounded-3xl card p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold">{t(lang,'about.high1.t')}</h3>
                  <ul className="mt-3 space-y-2 text-slate-300 list-disc list-inside">
                    <li>{t(lang,'about.high1.i1')}</li>
                    <li>{t(lang,'about.high1.i2')}</li>
                    <li>{t(lang,'about.high1.i3')}</li>
                    <li>{t(lang,'about.high1.i4')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t(lang,'about.high2.t')}</h3>
                  <ul className="mt-3 space-y-2 text-slate-300 list-disc list-inside">
                    <li>{t(lang,'about.high2.i1')}</li>
                    <li>{t(lang,'about.high2.i2')}</li>
                    <li>{t(lang,'about.high2.i3')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Finame(){
  const {lang}=useLang();
  return (
    <section id="finame" className="py-24 bg-slate-900/60 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'finame.title')}</h2>
            <p className="mt-4 text-slate-300">{t(lang,'finame.p1')}</p>
            <p className="mt-3 text-slate-300">{t(lang,'finame.p2')}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl card p-5">
                <h3 className="font-bold">{t(lang,'finame.how.t')}</h3>
                <p className="mt-2 text-sm text-slate-300">{t(lang,'finame.how.d')}</p>
              </div>
              <div className="rounded-2xl card p-5">
                <h3 className="font-bold">{t(lang,'finame.benefits.t')}</h3>
                <ul className="mt-2 text-sm text-slate-300 list-disc list-inside">
                  <li>{t(lang,'finame.benefits.i1')}</li>
                  <li>{t(lang,'finame.benefits.i2')}</li>
                  <li>{t(lang,'finame.benefits.i3')}</li>
                  <li>{t(lang,'finame.benefits.i4')}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="fade-up">
            <h3 className="text-xl font-bold">{t(lang,'finame.steps.t')}</h3>
            <ol className="mt-4 space-y-4">
              <li className="rounded-2xl card p-4">
                <div className="font-semibold">{t(lang,'finame.steps.i1.t')}</div>
                <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i1.d')}</div>
              </li>
              <li className="rounded-2xl card p-4">
                <div className="font-semibold">{t(lang,'finame.steps.i2.t')}</div>
                <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i2.d')}</div>
              </li>
              <li className="rounded-2xl card p-4">
                <div className="font-semibold">{t(lang,'finame.steps.i3.t')}</div>
                <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i3.d')}</div>
              </li>
              <li className="rounded-2xl card p-4">
                <div className="font-semibold">{t(lang,'finame.steps.i4.t')}</div>
                <div className="text-slate-300 text-sm mt-1">{t(lang,'finame.steps.i4.d')}</div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services(){
  const {lang}=useLang();
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'services.title')}</h2>
          <p className="mt-3 text-slate-300">{t(lang,'services.lead')}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="rounded-3xl card p-6 fade-up">
            <div className="text-lg font-bold">{t(lang,'services.s1.t')}</div>
            <p className="mt-2 text-sm text-slate-300">{t(lang,'services.s1.d')}</p>
          </div>
          <div className="rounded-3xl card p-6 fade-up">
            <div className="text-lg font-bold">{t(lang,'services.s2.t')}</div>
            <p className="mt-2 text-sm text-slate-300">{t(lang,'services.s2.d')}</p>
          </div>
          <div className="rounded-3xl card p-6 fade-up">
            <div className="text-lg font-bold">{t(lang,'services.s3.t')}</div>
            <p className="mt-2 text-sm text-slate-300">{t(lang,'services.s3.d')}</p>
          </div>
          <div className="rounded-3xl card p-6 fade-up">
            <div className="text-lg font-bold">{t(lang,'services.s4.t')}</div>
            <p className="mt-2 text-sm text-slate-300">{t(lang,'services.s4.d')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cases(){
  const {lang}=useLang();
  return (
    <section id="cases" className="py-24 bg-slate-900/60 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t(lang,'cases.title')}</h2>
          <p className="mt-3 text-slate-300">{t(lang,'cases.lead')}</p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <article className="rounded-3xl card p-6 fade-up">
            <h3 className="text-xl font-bold">Trina Solar</h3>
            <p className="mt-2 text-slate-300">{t(lang,'cases.trina')}</p>
          </article>
          <article className="rounded-3xl card p-6 fade-up">
            <h3 className="text-xl font-bold">Arctech Solar</h3>
            <p className="mt-2 text-slate-300">{t(lang,'cases.arctech')}</p>
          </article>
          <article className="rounded-3xl card p-6 fade-up">
            <h3 className="text-xl font-bold">CRRC — Metrô de São Paulo</h3>
            <p className="mt-2 text-slate-300">{t(lang,'cases.crrc')}</p>
          </article>
          <article className="rounded-3xl card p-6 fade-up">
            <h3 className="text-xl font-bold">{t(lang,'cases.testiTitle')}</h3>
            <ul className="mt-2 space-y-2 text-slate-300 text-sm list-disc list-inside">
              <li>{t(lang,'cases.testi1')}</li>
              <li>{t(lang,'cases.testi2')}</li>
            </ul>
          </article>
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
              <a href="https://wa.me/5521997805858" target="_blank" className="rounded-2xl bg-emerald-400 text-slate-900 font-semibold px-5 py-3 shadow-soft hover:bg-emerald-300">{t(lang,'contact.whats')}</a>
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
              <button className="rounded-2xl bg-emerald-400 text-slate-900 font-semibold px-5 py-3 shadow-soft hover:bg-emerald-300">{t(lang,'contact.form.cta')}</button>
            </div>
            <p className="mt-3 text-xs text-slate-400">{t(lang,'contact.disclaimer')}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
