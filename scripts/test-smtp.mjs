#!/usr/bin/env node
/**
 * Testador de SMTP “tenta tudo”
 * Uso:
 *   node scripts/test-smtp.mjs --domain pearsonconsultoria.com.br --user contato --pass "SUA_SENHA" --send
 *   # ou
 *   node scripts/test-smtp.mjs --host smtp.pearsonconsultoria.com.br --user contato@pearsonconsultoria.com.br --pass "SUA_SENHA"
 */
import nodemailer from 'nodemailer';

// ---- PARSER que aceita "--k=v" e "--k v"
function parseArgs(argv) {
  const out = {};
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const tok = args[i];
    if (!tok.startsWith('--')) continue;
    const eq = tok.indexOf('=');
    if (eq > -1) {
      const key = tok.slice(2, eq);
      const val = tok.slice(eq + 1);
      out[key] = val;
    } else {
      const key = tok.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true; // flag booleana
      }
    }
  }
  return out;
}
// -------------------------------------------

const args = parseArgs(process.argv);
function uniq(a) { return [...new Set(a.filter(Boolean))]; }
function mask(s) {
  if (!s) return '';
  const len = s.length;
  if (len <= 4) return '*'.repeat(len);
  return s.slice(0, 2) + '*'.repeat(Math.max(4, len - 4)) + s.slice(-2);
}

const hostArg = typeof args.host === 'string' ? args.host : undefined;
const domain =
  typeof args.domain === 'string'
    ? args.domain
    : hostArg
    ? hostArg.split('.').slice(-2).join('.')
    : undefined;

if (!domain && !hostArg) {
  console.error('✖ Passe --domain <dominio> ou --host <host>');
  process.exit(1);
}

const userArg =
  typeof args.user === 'string' && args.user.trim()
    ? args.user.trim()
    : 'contato';

const pass =
  (typeof args.pass === 'string' && args.pass) || process.env.SMTP_PASS;
if (!pass) {
  console.error('✖ Passe --pass "<senha_da_caixa>"');
  process.exit(1);
}

const hosts = uniq([hostArg, domain ? `smtp.${domain}` : null, domain ? `mail.${domain}` : null]);

// Se user já for completo (@ ou =), usa como está; senão monta variantes
const users =
  userArg.includes('@') || userArg.includes('=')
    ? [userArg]
    : [`${userArg}@${domain}`, `${userArg}=${domain}`];

const atUsers = users.map((u) => (u.includes('=') ? u.replace('=', '@') : u));
const fromArg = typeof args.from === 'string' ? args.from : atUsers[0];
const toArg = typeof args.to === 'string' ? args.to : fromArg;

const portCombos = [
  { name: '587/STARTTLS', port: 587, secure: false, requireTLS: true, tls: { minVersion: 'TLSv1.2' } },
  { name: '587/tolerant', port: 587, secure: false, tls: { rejectUnauthorized: false } },
  { name: '587/noTLS', port: 587, secure: false, ignoreTLS: true },
  { name: '465/SSL', port: 465, secure: true, tls: { minVersion: 'TLSv1.2' } },
];
const authMethods = ['LOGIN', 'PLAIN'];

const baseTimeouts = {
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 15000,
};

async function tryOne({ host, user, combo, authMethod }) {
  const cfg = {
    host,
    port: combo.port,
    secure: combo.secure,
    auth: { user, pass },
    authMethod,
    ...baseTimeouts,
  };
  if (combo.requireTLS !== undefined) cfg.requireTLS = combo.requireTLS;
  if (combo.ignoreTLS !== undefined) cfg.ignoreTLS = combo.ignoreTLS;
  if (combo.tls) cfg.tls = combo.tls;

  const label = `${host} | user:${user} | ${combo.name} | auth:${authMethod}`;
  process.stdout.write(`→ Testando ${label} ... `);
  const transporter = nodemailer.createTransport(cfg);
  try {
    await transporter.verify();
    console.log('OK');
    return transporter;
  } catch (e) {
    console.log('falhou');
    const code = e?.code ?? '';
    const resp = e?.responseCode ? ` resp=${e.responseCode}` : '';
    console.log(
      `   motivo: ${code}${resp} ${
        e?.response ? '- ' + String(e.response).slice(0, 140) : ''
      }`
    );
    return null;
  }
}

(async () => {
  console.log('=== SMTP auto-tester ===');
  console.log(`Hosts: ${hosts.join(', ')}`);
  console.log(`Users: ${users.join(', ')}`);
  console.log(`From : ${fromArg}  To: ${toArg}`);
  console.log(`Pass : ${mask(pass)}\n`);

  let working = null;
  let picked = null;

  outer: for (const host of hosts) {
    for (const user of users) {
      for (const combo of portCombos) {
        for (const authMethod of authMethods) {
          const t = await tryOne({ host, user, combo, authMethod });
          if (t) {
            working = t;
            picked = { host, user, combo, authMethod };
            break outer;
          }
        }
      }
    }
  }

  if (!working) {
    console.error(
      '\n✖ Nenhuma combinação funcionou. Verifique senha, firewall/porta, e se o FROM é permitido pelo servidor.'
    );
    process.exit(2);
  }

  console.log('\n✅ CONFIG FUNCIONANDO:');
  console.log(`Host      : ${picked.host}`);
  console.log(`User      : ${picked.user}`);
  console.log(`Port      : ${picked.combo.port}`);
  console.log(`Secure    : ${picked.combo.secure}`);
  if (picked.combo.requireTLS !== undefined) console.log(`requireTLS: ${picked.combo.requireTLS}`);
  if (picked.combo.ignoreTLS !== undefined) console.log(`ignoreTLS : ${picked.combo.ignoreTLS}`);
  if (picked.combo.tls) console.log(`TLS opts  : ${JSON.stringify(picked.combo.tls)}`);
  console.log(`authMethod: ${picked.authMethod}`);

  console.log('\n📄 Sugerido no .env:');
  console.log(`CONTACT_TO=${toArg}`);
  console.log(`CONTACT_FROM=${fromArg}`);
  console.log(`SMTP_HOST=${picked.host}`);
  console.log(`SMTP_PORT=${picked.combo.port}`);
  console.log(`SMTP_SECURE=${picked.combo.secure}`);
  console.log(`SMTP_USER=${picked.user}`);
  console.log(`SMTP_PASS=<sua_senha>\n`);

  if (args.send) {
    const subject = `SMTP Test OK (${new Date().toISOString()})`;
    const html = `<p>Teste SMTP OK em <b>${new Date().toLocaleString()}</b>.<br>
    Host: ${picked.host} | Port: ${picked.combo.port} | Secure: ${picked.combo.secure} | Auth: ${picked.authMethod}</p>`;
    try {
      await working.sendMail({
        from: fromArg,
        to: toArg,
        subject,
        html,
        text: `Teste SMTP OK ${new Date().toISOString()}`,
      });
      console.log('✉️  E-mail de teste enviado com sucesso.');
    } catch (e) {
      console.error('✖ Falhou ao enviar o e-mail de teste:', e?.message || e);
      process.exit(3);
    }
  }
  process.exit(0);
})();
