import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../script.js', import.meta.url), 'utf8');
function widget({ hash = '', fetcher } = {}) {
  let focused;
  const element = id => ({
    id, hidden: true, open: false, value: '', textContent: '', children: [], attributes: {}, listeners: {},
    addEventListener(type, fn) { this.listeners[type] = fn; },
    setAttribute(name, value) { this.attributes[name] = value; },
    getAttribute(name) { return this.attributes[name]; },
    focus() { focused = id; }, show() { this.open = true; }, close() { this.open = false; },
    append(child) { this.children.push(child); }, replaceChildren() { this.children = []; },
    remove() {},
  });
  const ids = ['chat-form', 'ask', 'chat-launcher', 'chat-close', 'chat-input', 'chat-send', 'chat-status', 'chat-messages', 'chat-clear'];
  const elements = Object.fromEntries(ids.map(id => [id, element(id)]));
  const document = {
    listeners: {}, querySelector: selector => elements[selector.slice(1)] || null,
    querySelectorAll: () => [], createElement: () => element('bubble'),
    addEventListener(type, fn) { this.listeners[type] = fn; },
  };
  const window = { location: { hash }, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } };
  vm.runInNewContext(source, { document, window, AbortSignal, fetch: fetcher, Date });
  return { elements, document, window, focus: () => focused };
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
