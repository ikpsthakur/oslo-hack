const planButton = document.querySelector('.plan-button');
const plan = document.querySelector('#session-plan');
const buttonLabel = planButton?.querySelector('.button-label');

if (planButton && plan && buttonLabel) {
  planButton.addEventListener('click', () => {
    const willOpen = planButton.getAttribute('aria-expanded') !== 'true';

    planButton.setAttribute('aria-expanded', String(willOpen));
    plan.hidden = !willOpen;
    buttonLabel.textContent = willOpen ? 'Hide session plan' : 'Show session plan';
  });
}

const year = document.querySelector('#year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const chatForm = document.querySelector('#chat-form');
if (chatForm) {
  const input = document.querySelector('#chat-input');
  const send = document.querySelector('#chat-send');
  const status = document.querySelector('#chat-status');
  const log = document.querySelector('#chat-messages');
  const clear = document.querySelector('#chat-clear');
  const suggestions = [...document.querySelectorAll('[data-question]')];
  let messages = [];
  let busy = false;

  function addMessage(role, text) {
    const element = document.createElement('p');
    element.className = `chat-message ${role}`;
    element.textContent = text;
    log.append(element);
    log.scrollTop = log.scrollHeight;
    return element;
  }
  function setBusy(value) {
    busy = value;
    send.disabled = value;
    clear.disabled = value;
    suggestions.forEach(button => { button.disabled = value; });
    send.textContent = value ? 'Thinking…' : 'Ask ↗';
    chatForm.setAttribute('aria-busy', String(value));
  }
  chatForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    const question = input.value.trim();
    if (!question || question.length > 1200) return;
    const pending = [...messages.slice(-8), { role: 'user', content: question }];
    const bubble = addMessage('user', question);
    input.value = '';
    status.textContent = 'Thinking about your question…';
    setBusy(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: pending }),
        signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok || !data.answer) throw new Error(data.error || 'The assistant is unavailable. Please try again later.');
      addMessage('assistant', data.answer);
      messages = [...pending, { role: 'assistant', content: data.answer }];
      status.textContent = '';
    } catch (error) {
      bubble.remove();
      if (!input.value) input.value = question;
      status.textContent = error.name === 'TimeoutError' ? 'That took too long. Your question is ready to try again.' : (error instanceof TypeError ? 'Could not connect. Check your connection and try again.' : error.message);
    } finally {
      setBusy(false);
      input.focus({ preventScroll: true });
    }
  });
  suggestions.forEach(button => button.addEventListener('click', () => {
    input.value = button.dataset.question;
    input.focus({ preventScroll: true });
    chatForm.requestSubmit();
  }));
  clear.addEventListener('click', () => {
    messages = [];
    log.replaceChildren();
    addMessage('assistant', 'Hi! What would you like to know about Oslo Hack?');
    status.textContent = 'Conversation cleared.';
    input.value = '';
    input.focus({ preventScroll: true });
  });
}
