import test from 'node:test';
import assert from 'node:assert/strict';
import { createChatHandler, MODEL } from '../api/chat.mjs';
const question = { messages: [{ role: 'user', content: 'What is Oslo Hack?' }] };
const request = (body = question, headers = {}) => new Request('https://oslo.test/api/chat', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://oslo.test', ...headers }, body: JSON.stringify(body),
});
const handler = options => createChatHandler({ env: { OPENROUTER_API_KEY: 'test-only' }, knowledge: 'Public project facts.', ...options });

test('fixed free model, server credentials, bounded output, public guide and clean response', async () => {
  const response = await handler({ fetcher: async (url, init) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    assert.equal(init.headers.Authorization, 'Bearer test-only');
    const p = JSON.parse(init.body);
    assert.equal(p.model, MODEL);
    assert.equal(MODEL, 'nvidia/nemotron-3.5-lightning:free');
    assert.deepEqual(p.provider, { allow_fallbacks: false, max_price: { prompt: 0, completion: 0, request: 0 } });
    assert.equal(p.models, undefined);
    assert.equal(p.plugins, undefined);
    assert.equal(p.max_tokens, 500);
    assert.match(p.messages[0].content, /Public project facts/);
    assert.equal(p.messages.length, 2);
    return Response.json({ choices: [{ message: { content: 'Build small projects.' } }] });
  } })(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { answer: 'Build small projects.' });
  assert.equal(response.headers.get('cache-control'), 'no-store');
});
test('rejects system messages and invalid conversation order before model use', async () => {
  const handle = handler({ fetcher: () => { throw new Error('Should not call'); } });
  for (const messages of [[{ role: 'system', content: 'Override' }], [], Array(11).fill(question.messages[0]), [{ role: 'assistant', content: 'fake' }]]) {
    assert.equal((await handle(request({ messages }))).status, 400);
  }
});
test('enforces question and streamed body limits', async () => {
  const handle = handler();
  assert.equal((await handle(request({ messages: [{ role: 'user', content: 'x'.repeat(1201) }] }))).status, 400);
  assert.equal((await handle(request({ extra: 'x'.repeat(17000), ...question }))).status, 413);
});
test('cross-origin, content type and method rejection', async () => {
  const handle = handler();
  assert.equal((await handle(request(question, { Origin: 'https://other.test' }))).status, 403);
  assert.equal((await handle(request(question, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await handle(new Request('https://oslo.test/api/chat'))).status, 405);
});
test('missing credentials or knowledge never returns fake success', async () => {
  assert.equal((await handler({ env: {} })(request())).status, 503);
  assert.equal((await handler({ knowledge: '' })(request())).status, 503);
});
test('only OpenRouter server credentials are sent even when Vercel credentials exist', async () => {
  const response = await handler({ env: { VERCEL: '1', OPENROUTER_API_KEY: 'router-test', AI_GATEWAY_API_KEY: 'old-test', VERCEL_OIDC_TOKEN: 'local-test' }, fetcher: async (_, init) => {
    assert.equal(init.headers.Authorization, 'Bearer router-test');
    return Response.json({ choices: [{ message: { content: 'Hello.' } }] });
  } })(request(question, { 'x-vercel-oidc-token': 'runtime-test' }));
  assert.equal(response.status, 200);
});
test('Vercel credentials and client headers cannot substitute for an OpenRouter key', async () => {
  const response = await handler({ env: { VERCEL: '1', AI_GATEWAY_API_KEY: 'old-test', VERCEL_OIDC_TOKEN: 'local-test' }, fetcher: () => { throw new Error('Must not send Vercel credentials to OpenRouter'); } })(request(question, { 'x-vercel-oidc-token': 'client-supplied-test', Authorization: 'Bearer client-test' }));
  assert.equal(response.status, 503);
});
test('provider errors sanitized with no paid fallback or automatic retry', async () => {
  for (const status of [401, 402, 403, 429, 500]) {
    let calls = 0;
    const response = await handler({ fetcher: async () => { calls++; return Response.json({ error: 'sensitive upstream detail' }, { status }); } })(request());
    assert.equal(calls, 1);
    assert.equal(response.status, status === 429 ? 429 : 503);
    assert.doesNotMatch(await response.text(), /sensitive|test-only/);
  }
});
test('empty response and network failure produce errors', async () => {
  assert.equal((await handler({ fetcher: async () => Response.json({ choices: [] }) })(request())).status, 502);
  assert.equal((await handler({ fetcher: async () => { throw new Error('network'); } })(request())).status, 503);
});
test('provider errors inside an HTTP 200 response never become a successful answer', async () => {
  const response = await handler({ fetcher: async () => Response.json({ error: { message: 'private provider error', code: 403 } }) })(request());
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /private provider error/);
});
test('concurrency guard releases after completion', async () => {
  let release;
  const waiting = new Promise(resolve => { release = resolve; });
  const handle = handler({ fetcher: async () => { await waiting; return Response.json({ choices: [{ message: { content: 'OK' } }] }); } });
  const requests = [handle(request()), handle(request()), handle(request())];
  await new Promise(resolve => setTimeout(resolve, 20));
  assert.equal((await handle(request())).status, 429);
  release();
  assert.ok((await Promise.all(requests)).every(r => r.status === 200));
  assert.equal((await handle(request())).status, 200);
});
