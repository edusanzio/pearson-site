// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs'; // pode ser 'edge' também; 'nodejs' está ok

const resend = new Resend(process.env.RESEND_API_KEY);

function renderHtml({
  name,
  company,
  email,
  phone,
  message,
  locale,
}: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  locale?: string;
}) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#0f172a">
    <h2 style="margin:0 0 12px 0">Novo contato do site</h2>
    <p><b>Nome:</b> ${name}</p>
    <p><b>Empresa:</b> ${company}</p>
    <p><b>E-mail:</b> ${email}</p>
    ${phone ? `<p><b>Telefone:</b> ${phone}</p>` : ''}
    ${locale ? `<p><b>Idioma:</b> ${locale}</p>` : ''}
    <p style="margin-top:12px"><b>Mensagem:</b></p>
    <pre style="white-space:pre-wrap;background:#f8fafc;border-radius:8px;padding:12px">${message}</pre>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, email, phone, message, locale, hp } = await req.json();

    // honeypot anti-bot
    if (hp) return NextResponse.json({ ok: true });

    if (!name || !company || !email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }

    const TO = process.env.CONTACT_TO || 'contato@pearsonconsultoria.com.br';
    const FROM = process.env.CONTACT_FROM || 'onboarding@resend.dev'; // fallback p/ testes

    const subject = `Projeto FINAME — ${company}`;
    const html = renderHtml({ name, company, email, phone, message, locale });
    const text =
      `Novo contato do site\n\n` +
      `Nome: ${name}\n` +
      `Empresa: ${company}\n` +
      `E-mail: ${email}\n` +
      (phone ? `Telefone: ${phone}\n` : '') +
      (locale ? `Idioma: ${locale}\n` : '') +
      `\nMensagem:\n${message}`;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      text,
      replyTo: typeof email === 'string' ? email : undefined, // responde para o cliente
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Resend failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('contact route error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected server error' }, { status: 500 });
  }
}
