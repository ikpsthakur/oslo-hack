import { readFile, writeFile, readdir, mkdir, copyFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadKnowledge } from './knowledge.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const assets = ['index.html', 'style.css', 'script.js', 'photo.jpg', 'vercel.json'];
const read = p => readFile(path.join(root, p), 'utf8');
const errors = [];
const assert = (ok, message) => { if (!ok) errors.push(message); };
const hash = data => createHash('sha256').update(data).digest('hex');
async function walk(dir) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
  return files.flat();
}
async function generatedApi() {
  const guide = await loadKnowledge(root);
  const api = await read('api/chat.mjs');
  if (!api.includes('/* PUBLIC_GUIDE */ ""')) throw new Error('Public guide build marker is missing');
  return api.replace('/* PUBLIC_GUIDE */ ""', () => JSON.stringify(guide));
}
async function generatedPackage() {
  return JSON.stringify({ name: 'oslo-hack-runtime', private: true, type: 'module', engines: { node: '24.x' } }, null, 2) + '\n';
}
async function build() {
  await mkdir(path.join(root, 'dist/api'), { recursive: true });
  for (const name of assets) await copyFile(path.join(root, name), path.join(root, 'dist', name));
  await writeFile(path.join(root, 'dist/api/chat.mjs'), await generatedApi());
  await writeFile(path.join(root, 'dist/package.json'), await generatedPackage());
  console.log('Built 7 allowlisted runtime files in dist; hosting link preserved.');
}
async function wikiCheck() {
  await loadKnowledge(root);
  const manifest = JSON.parse(await read('raw/manifest.json'));
  const rawFiles = (await walk('raw')).filter(p => p !== 'raw/manifest.json');
  for (const p of rawFiles) assert(manifest[p], `Unregistered raw source: ${p}`);
  for (const [p, expected] of Object.entries(manifest)) {
    assert(p.startsWith('raw/') && !p.includes('..'), `Invalid raw source path: ${p}`);
    try { assert(hash(await readFile(path.join(root, p))) === expected, `Raw source changed: ${p}`); }
    catch { assert(false, `Raw source missing: ${p}`); }
  }
  const wikiFiles = (await walk('wiki')).filter(p => p.endsWith('.md'));
  const mdFiles = ['README.md', 'AGENTS.md', 'outputs/README.md', ...(await walk('templates')), ...wikiFiles];
  const incoming = new Set();
  const indexTargets = new Set();
  for (const file of mdFiles) {
    const text = await read(file);
    if (file.startsWith('wiki/')) {
      const meta = text.match(/^---\n([\s\S]*?)\n---/);
      for (const field of ['title', 'type', 'status', 'updated']) assert(meta && new RegExp(`^${field}: .+`, 'm').test(meta[1]), `${file}: missing ${field}`);
      assert(meta && /^updated: \d{4}-\d{2}-\d{2}$/m.test(meta[1]), `${file}: invalid updated date`);
    }
    const prose = text.replace(/```[\s\S]*?```/g, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const href = match[1];
      if (/^[a-z]+:/i.test(href) || href.startsWith('#')) continue;
      const destination = path.resolve(root, path.dirname(file), decodeURIComponent(href.split('#')[0]));
      assert(destination.startsWith(root), `${file}: link escapes project: ${href}`);
      try { await stat(destination); } catch { assert(false, `${file}: broken link ${href}`); }
      const target = path.relative(root, destination);
      if (target !== file) incoming.add(target);
      if (file === 'wiki/index.md') indexTargets.add(target);
    }
  }
  for (const file of wikiFiles.filter(p => p !== 'wiki/index.md')) {
    assert(indexTargets.has(file), `Wiki index missing ${file}`);
    assert(incoming.has(file), `Orphan wiki page ${file}`);
  }
  console.log(`Checked ${wikiFiles.length} wiki pages and ${rawFiles.length} immutable sources.`);
}
async function siteCheck() {
  for (const name of assets) assert((await readFile(path.join(root, name))).equals(await readFile(path.join(root, 'dist', name))), `Rebuild required: ${name}`);
  assert(await read('dist/api/chat.mjs') === await generatedApi(), 'Rebuild required: API/public knowledge');
  assert(await read('dist/package.json') === await generatedPackage(), 'Rebuild required: runtime package');
  const html = await read('index.html');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert(ids.length === new Set(ids).size, 'Duplicate HTML IDs');
  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) assert(ids.includes(target), `Missing anchor #${target}`);
  for (const [, source] of html.matchAll(/\b(?:src|href)="([^"#]+)"/g)) {
    if (/^[a-z]+:/i.test(source)) continue;
    try { await stat(path.join(root, source.split('?')[0])); } catch { assert(false, `Missing asset ${source}`); }
  }
  assert(/name="viewport"/.test(html), 'Missing phone viewport');
  for (const file of ['script.js', 'api/chat.mjs', 'dist/api/chat.mjs']) {
    const result = spawnSync(process.execPath, ['--check', path.join(root, file)], { encoding: 'utf8' });
    assert(result.status === 0, `${file}: ${result.stderr}`);
  }
  const allowed = new Set([...assets, 'api/chat.mjs', 'package.json', '.gitignore']);
  for (const file of await walk('dist')) {
    const relative = file.slice(5);
    if (relative.startsWith('.vercel/') || relative === '.env.local') continue;
    assert(allowed.has(relative), `Unexpected deploy file: ${relative}`);
  }
  console.log('Checked website anchors, assets, JavaScript syntax, and deployment parity.');
}
try {
  const command = process.argv[2];
  if (command === 'build') await build();
  else if (command === 'wiki-check') await wikiCheck();
  else if (command === 'check') { await wikiCheck(); await siteCheck(); }
  else throw new Error('Use build, wiki-check, or check');
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('PASS');
} catch (error) { console.error(error.message); process.exitCode = 1; }
