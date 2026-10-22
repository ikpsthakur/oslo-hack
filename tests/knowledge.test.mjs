import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { compileKnowledge, loadKnowledge, validateSources } from '../scripts/knowledge.mjs';
import { createChatHandler } from '../api/chat.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const guide = { path: 'wiki/public/visitor-guide.md', kind: 'public-guide', content: '---\ntitle: Guide\n---\nReal event details are unconfirmed.' };
const sample = { path: 'wiki/public/synthetic/test.md', kind: 'synthetic', content: '---\ndataset: synthetic\n---\nFictional demo only.\n## FAQ-001 — Sample\nNot a real event.' };

test('knowledge includes 56 labelled records, source attribution, and baseline precedence', async () => {
  const bundle = await loadKnowledge(root);
  assert.equal([...bundle.matchAll(/^## (?:FAQ|SESSION|PROJECT|POLICY|GUIDE|SUPPORT|COMBO|INSIGHT)-\d{3}\b/gm)].length, 56);
  assert.equal([...bundle.matchAll(/^TYPE: SYNTHETIC/gm)].length, 8);
  assert.ok(bundle.length <= 32000);
  assert.match(bundle, /BASELINE PUBLIC GUIDE/);
  assert.match(bundle, /SOURCE: wiki\/public\/synthetic\/sessions.md/);
  assert.match(bundle, /No next event date/);
  assert.doesNotMatch(bundle, /raw\/|AGENTS\.md|Evaluation prompts|Vercel API request failed/);
});

test('only explicit public paths can be included, not arbitrary wiki or raw files', () => {
  for (const candidate of ['raw/private.md', 'wiki/architecture.md', 'wiki/public/../../private.md', '/tmp/private.md', 'wiki/public/file.json']) {
    assert.throws(() => validateSources({ version: 1, sources: [guide, { path: candidate, kind: 'synthetic' }] }));
  }
  assert.throws(() => validateSources({ version: 1, sources: [guide, guide] }), /Duplicate/);
  assert.throws(() => validateSources({ version: 1, sources: [sample] }), /visitor guide/);
});

test('synthetic type and visible fictional warnings cannot be silently removed', () => {
  assert.throws(() => compileKnowledge([guide, { ...sample, content: sample.content.replace('dataset: synthetic', 'dataset: confirmed') }]), /type mismatch/);
  assert.throws(() => compileKnowledge([guide, { ...sample, content: sample.content.replace('Fictional demo only.', 'Real session.') }]), /warning/);
  assert.throws(() => compileKnowledge([{ ...guide, content: '---\ndataset: synthetic\n---\nFictional.' }]), /type mismatch/);
});

test('empty sources, duplicate record IDs and excessive context fail closed', () => {
  assert.throws(() => compileKnowledge([guide, { ...sample, content: '---\ndataset: synthetic\n---\n' }]), /Empty/);
  assert.throws(() => compileKnowledge([guide, sample, { ...sample, path: 'wiki/public/synthetic/other.md' }]), /Duplicate synthetic record/);
  assert.throws(() => compileKnowledge([{ ...guide, content: guide.content + 'x'.repeat(32000) }, sample]), /exceeds/);
});

test('real compiled knowledge and synthetic-answer rules reach the model request', async () => {
  let seen = false;
  const handle = createChatHandler({ env: { OPENROUTER_API_KEY: 'test-only' }, knowledge: await loadKnowledge(root), fetcher: async (_, init) => {
    const system = JSON.parse(init.body).messages[0].content;
    assert.match(system, /Every answer drawing on synthetic records must explicitly say/);
    assert.match(system, /baseline guide takes priority/i);
    assert.match(system, /SESSION-001/);
    assert.match(system, /FAQ-008/);
    assert.match(system, /PROJECT-003/);
    assert.match(system, /POLICY-004/);
    for (const id of ['GUIDE-008', 'SUPPORT-008', 'COMBO-008', 'INSIGHT-006', 'PROJECT-012']) assert.ok(system.includes(id));
    assert.match(system, /never claim to fetch GitHub live/);
    seen = true;
    return Response.json({ choices: [{ message: { content: 'In this fictional demo, a beginner session is an example only.' } }] });
  } });
  const response = await handle(new Request('https://oslo.test/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: 'Show me a demo beginner session.' }] }) }));
  assert.equal(response.status, 200);
  assert.equal(seen, true);
  assert.match((await response.json()).answer, /fictional demo/);
});

test('new record categories reject duplicate IDs and dangling combination references', () => {
  const combo = { ...sample, path: 'wiki/public/synthetic/combinations.md', content: '---\ndataset: synthetic\n---\nFictional demo.\n## COMBO-001 — Mix\nTry GUIDE-999.' };
  assert.throws(() => compileKnowledge([guide, combo]), /Unknown knowledge record reference: GUIDE-999/);
  const known = { ...combo, content: combo.content.replace('GUIDE-999', 'FAQ-001') };
  assert.ok(compileKnowledge([guide, sample, known]).includes('COMBO-001'));
  assert.throws(() => compileKnowledge([guide, sample, known, { ...known, path: 'wiki/public/synthetic/duplicate.md' }]), /Duplicate synthetic record/);
});

test('deployable API contains allowlisted knowledge but not raw-store or internal wiki documents', async () => {
  const deployed = await readFile(new URL('../dist/api/chat.mjs', import.meta.url), 'utf8');
  assert.match(deployed, /SESSION-001/);
  assert.match(deployed, /POLICY-004/);
  assert.doesNotMatch(deployed, /\/\* PUBLIC_GUIDE \*\/|# Oslo Hack: project and LLM Wiki instructions|# Synthetic knowledge evaluation prompts|# User requirements captured/);
});
