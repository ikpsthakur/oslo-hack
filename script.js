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
