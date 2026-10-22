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
  const panel = document.querySelector('#ask');
  const launcher = document.querySelector('#chat-launcher');
  const close = document.querySelector('#chat-close');
  const input = document.querySelector('#chat-input');
  const send = document.querySelector('#chat-send');
  const status = document.querySelector('#chat-status');
  const log = document.querySelector('#chat-messages');
  const clear = document.querySelector('#chat-clear');
  const suggestions = [...document.querySelectorAll('[data-question]')];
  const moreIdeas = document.querySelector('#chat-more');
  // One prompt per group keeps each set varied. Rotation never calls the model.
  const questionGroups = [
    [
      ['New here?', 'Can I join as a beginner?'],
      ['Start in 30 minutes', 'Give me a fictional 30-minute guide for starting a small project.'],
      ['Find my role', 'In a fictional team, what could I contribute without coding?'],
      ['Stuck on an idea?', 'In your fictional support guide, how can a team choose between too many ideas?'],
      ['Test a prototype', 'Show me a fictional guide to testing a prototype with three people.'],
      ['Next meetup?', 'When and where is the next real meetup?'],
    ],
    [
      ['A tiny project', 'Suggest one fictional project I could prototype in an afternoon.'],
      ['No-code ideas', 'Give me a fictional no-code project idea and one beginner task.'],
      ['Repair café board', 'Describe the fictional repair café triage board project.'],
      ['Accessible design', 'Show me the fictional accessibility checklist project without claiming a venue is accessible.'],
      ['A learning game', 'Tell me about the fictional learning game project.'],
      ['Creative leftovers', 'Describe the fictional leftover ingredient idea cards project.'],
    ],
    [
      ['Mix two ideas', 'Suggest one fictional combination of two catalogue projects and a tiny first step.'],
      ['Language + maps', 'Explain the fictional language-and-neighbourhood combination.'],
      ['Design + coding', 'Show a fictional collaboration between a designer and a beginner coder.'],
      ['A surprising twist', 'Share one interesting fictional experiment from your insight cards.'],
      ['Reuse a prototype', 'In a fictional example, how could one prototype support a second project?'],
      ['Where answers come from', 'Where does this chatbot get its information? Does it read GitHub live?'],
    ],
  ];
  let messages = [];
  let busy = false;

  function rotateSuggestions() {
    if (busy) return;
    suggestions.forEach((button, index) => {
      const choices = questionGroups[index].filter(([, question]) => question !== button.dataset.question);
      const [label, question] = choices[Math.floor(Math.random() * choices.length)];
      button.textContent = label;
      button.dataset.question = question;
      button.setAttribute('title', question);
    });
  }
  moreIdeas.addEventListener('click', () => {
    if (busy) return;
    rotateSuggestions();
    status.textContent = 'New example questions ready.';
  });
  rotateSuggestions();

  function openChat() {
    if (!panel.open) panel.show();
    rotateSuggestions();
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Close Oslo Hack chat');
    input.focus({ preventScroll: true });
    log.scrollTop = log.scrollHeight;
  }
  function closeChat() {
    panel.close();
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Open Oslo Hack chat');
    launcher.focus({ preventScroll: true });
  }
  launcher.hidden = false;
  launcher.addEventListener('click', () => panel.open ? closeChat() : openChat());
  close.addEventListener('click', closeChat);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.open) { event.preventDefault(); closeChat(); }
  });
  function openFromLink() {
    if (window.location.hash === '#ask') openChat();
  }
  window.addEventListener('hashchange', openFromLink);
  openFromLink();

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
    moreIdeas.disabled = value;
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
      // A response may arrive after the visitor closes the panel. Do not steal focus.
      if (panel.open) input.focus({ preventScroll: true });
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
    rotateSuggestions();
    input.value = '';
    input.focus({ preventScroll: true });
  });
}
