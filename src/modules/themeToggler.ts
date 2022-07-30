import { createSvgIcon, prefersDarkMode } from './utils';

export function addThemeToggler(checkboxId = 'theme-switcher') {
  const floatingMenu = document.querySelector('.floating-menu__menu');

  const li = document.createElement('li');
  li.className = 'floating-menu__item tooltip tooltip--left';
  li.setAttribute('data-tooltip', 'Toggle light/dark theme');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxId;

  const label = document.createElement('label');
  label.className = 'floating-menu__button';
  label.setAttribute('for', checkboxId);
  label.setAttribute('tabindex', "0");

  const moonIcon = createSvgIcon('moon');
  const sunIcon = createSvgIcon('sun');

  label.appendChild(moonIcon);
  label.appendChild(sunIcon);

  li.appendChild(checkbox);
  li.appendChild(label);
  floatingMenu.appendChild(li);


  /* Add change event to toggle dark class on body element */

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      li.setAttribute('data-tooltip', 'Light theme');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      li.setAttribute('data-tooltip', 'Dark theme');
    }
  });

  /* Check if prefers dark theme is true and immediately apply dark theme */

  if (prefersDarkMode()) {
    checkbox.click();
  }
}
