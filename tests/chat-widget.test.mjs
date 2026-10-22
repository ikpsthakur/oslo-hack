import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../script.js', import.meta.url), 'utf8');
function widget({ hash = '', fetcher } = {}) {
  let focused;
  const element = id => ({
    id, hidden: true, open: false, value: '', textContent: '', children: [], attributes: {}, listeners: {}, dataset: {},
    addEventListener(type, fn) { this.listeners[type] = fn; },
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    focus() { focused = id; }, show() { this.open = true; }, close() { this.open = false; },
    append(child) { this.children.push(child); }, replaceChildren() { this.children = []; },
    remove() {},
    requestSubmit() { return this.listeners.submit({ preventDefault() {} }); },
  });
  const ids = ['chat-form', 'ask', 'chat-launcher', 'chat-close', 'chat-input', 'chat-send', 'chat-status', 'chat-messages', 'chat-clear', 'chat-more'];
  const elements = Object.fromEntries(ids.map(id => [id, element(id)]));
  const suggestions = [element('suggestion-1'), element('suggestion-2'), element('suggestion-3')];
  const document = {
    listeners: {}, querySelector: selector => elements[selector.slice(1)] || null,
    querySelectorAll: () => suggestions, createElement: () => element('bubble'),
    addEventListener(type, fn) { this.listeners[type] = fn; },
  };
  const window = { location: { hash }, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } };
  vm.runInNewContext(source, { document, window, AbortSignal, fetch: fetcher, Date });
  return { elements, document, window, suggestions, focus: () => focused };
}

test('launcher reveals a non-modal panel and close returns focus without clearing history', () => {
  const { elements: e, focus } = widget();
  assert.equal(e['chat-launcher'].hidden, false);
  assert.equal(e.ask.open, false);
  e['chat-launcher'].listeners.click();
  assert.equal(e.ask.open, true);
  assert.equal(e['chat-launcher'].attributes['aria-expanded'], 'true');
  assert.equal(focus(), 'chat-input');
  e['chat-messages'].append({ textContent: 'Keep this reply' });
  e['chat-close'].listeners.click();
  assert.equal(e.ask.open, false);
  assert.equal(focus(), 'chat-launcher');
  e['chat-launcher'].listeners.click();
  assert.equal(e['chat-messages'].children[0].textContent, 'Keep this reply');
  e['chat-launcher'].listeners.click();
  assert.equal(e.ask.open, false);
  assert.equal(e['chat-launcher'].attributes['aria-expanded'], 'false');
});

test('Escape closes only an open panel and returns focus to the launcher', () => {
  const { elements: e, document, focus } = widget();
  let prevented = 0;
  const escape = { key: 'Escape', preventDefault() { prevented++; } };
  document.listeners.keydown(escape);
  assert.equal(prevented, 0);
  e['chat-launcher'].listeners.click();
  document.listeners.keydown(escape);
  assert.equal(e.ask.open, false);
  assert.equal(prevented, 1);
  assert.equal(focus(), 'chat-launcher');
});

test('existing ask deep links open the panel on load and hash changes', () => {
  const { elements: e, window } = widget({ hash: '#ask' });
  assert.equal(e.ask.open, true);
  e['chat-close'].listeners.click();
  window.location.hash = '#session';
  window.listeners.hashchange();
  assert.equal(e.ask.open, false);
  window.location.hash = '#ask';
  window.listeners.hashchange();
  assert.equal(e.ask.open, true);
});

test('closing during a request retains its answer but never steals page focus', async () => {
  let finish;
  const response = new Promise(resolve => { finish = resolve; });
  const { elements: e, focus } = widget({ fetcher: () => response });
  e['chat-launcher'].listeners.click();
  e['chat-input'].value = 'What is Oslo Hack?';
  const pending = e['chat-form'].listeners.submit({ preventDefault() {} });
  assert.equal(e['chat-send'].disabled, true);
  e['chat-close'].listeners.click();
  finish({ ok: true, json: async () => ({ answer: 'Meet and build small projects.' }) });
  await pending;
  assert.equal(e.ask.open, false);
  assert.equal(focus(), 'chat-launcher');
  assert.equal(e['chat-send'].disabled, false);
  assert.equal(e['chat-messages'].children.at(-1).textContent, 'Meet and build small projects.');
  e['chat-launcher'].listeners.click();
  assert.equal(e.ask.open, true);
  assert.equal(focus(), 'chat-input');
});

test('rotating suggestions shows three distinct prompts without API calls or immediate repeats', () => {
  let calls = 0;
  const { elements: e, suggestions } = widget({ fetcher: () => { calls++; } });
  let previous = suggestions.map(b => b.dataset.question);
  for (let i = 0; i < 20; i++) {
    e['chat-more'].listeners.click();
    const current = suggestions.map(b => b.dataset.question);
    assert.equal(new Set(current).size, 3);
    current.forEach((q, j) => { assert.notEqual(q, previous[j]); assert.ok(q.length < 1200); });
    suggestions.forEach(b => { assert.ok(b.textContent); assert.equal(b.attributes.title, b.dataset.question); });
    previous = current;
  }
  assert.equal(calls, 0);
});

test('reopening rotates prompts without clearing a draft or conversation', () => {
  const { elements: e, suggestions } = widget();
  const before = suggestions.map(b => b.dataset.question);
  e['chat-input'].value = 'My own draft';
  e['chat-messages'].append({ textContent: 'Existing reply' });
  e['chat-launcher'].listeners.click();
  suggestions.forEach((b, i) => assert.notEqual(b.dataset.question, before[i]));
  assert.equal(e['chat-input'].value, 'My own draft');
  assert.equal(e['chat-messages'].children[0].textContent, 'Existing reply');
});

test('refresh is disabled while answering and does not change prompts during a request', async () => {
  let finish;
  const { elements: e, suggestions } = widget({ fetcher: () => new Promise(resolve => { finish = resolve; }) });
  e['chat-input'].value = 'Hello';
  const pending = e['chat-form'].requestSubmit();
  const before = suggestions.map(b => b.dataset.question);
  assert.equal(e['chat-more'].disabled, true);
  e['chat-more'].listeners.click();
  assert.deepEqual(suggestions.map(b => b.dataset.question), before);
  finish({ ok: true, json: async () => ({ answer: 'Hello.' }) });
  await pending;
  assert.equal(e['chat-more'].disabled, false);
  e['chat-clear'].listeners.click();
  suggestions.forEach((b, i) => assert.notEqual(b.dataset.question, before[i]));
});

test('a refreshed suggestion submits its current prompt, not its old label or prompt', async () => {
  let submitted;
  const { elements: e, suggestions } = widget({ fetcher: async (_, init) => {
    submitted = JSON.parse(init.body).messages[0].content;
    return { ok: true, json: async () => ({ answer: 'A demo answer.' }) };
  } });
  e['chat-more'].listeners.click();
  const expected = suggestions[0].dataset.question;
  suggestions[0].listeners.click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(submitted, expected);
});
