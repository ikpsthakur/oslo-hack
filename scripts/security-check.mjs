import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = args => execFileSync('git', args, { cwd: root });
const rules = [
  ['Vercel AI Gateway key', /\bvck_[A-Za-z0-9_-]{24,}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9_]{30,}\b/],
  ['GitHub fine-grained token', /\bgithub_pat_[A-Za-z0-9_]{30,}\b/],
  ['AI provider key', /\bsk-[A-Za-z0-9_-]{24,}\b/],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['JWT credential', /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\b/],
];
const findings = [];
function inspect(name, bytes) {
  if (/(^|\/)\.vercel\//.test(name) || /(^|\/)\.env(?:\.|$)/.test(name) && !name.endsWith('.env.example') || /\.(?:pem|key|p12|pfx)$/.test(name)) findings.push(`${name}: credential file must not be published`);
  if (bytes.includes(0)) return;
  const text = bytes.toString('utf8');
  for (const [label, pattern] of rules) if (pattern.test(text)) findings.push(`${name}: possible ${label}`);
}

if (process.argv.includes('--history')) {
  const objects = git(['rev-list', '--objects', '--all']).toString().trim().split('\n');
  for (const line of objects) {
    const space = line.indexOf(' ');
    if (space === -1) continue;
    const id = line.slice(0, space);
    const name = line.slice(space + 1);
    if (git(['cat-file', '-t', id]).toString().trim() !== 'blob') continue;
    inspect(`history:${name}`, git(['cat-file', 'blob', id]));
  }
  console.log('Checked existing Git history for common credential patterns.');
} else {
  const files = git(['ls-files', '-z']).toString().split('\0').filter(Boolean);
  for (const name of files) inspect(name, readFileSync(new URL(name, new URL('../', import.meta.url))));
  console.log(`Checked ${files.length} tracked files for common credential patterns.`);
}
if (findings.length) {
  // Never print secret values or matching source text.
  console.error(findings.join('\n'));
  process.exitCode = 1;
} else console.log('PASS (pattern scan; not a complete security audit)');
