import { createSvgIcon } from './utils';

export function addThemeToggler(checkboxId = 'theme-switcher') {
  const floatingMenu = document.querySelector('.floating-menu__menu');

  const li = document.createElement('li');
  li.className = 'floating-menu__item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxId;

  const label = document.createElement('label');
  label.setAttribute('for', checkboxId);

  const moonIcon = createSvgIcon('moon');
  const sunIcon = createSvgIcon('sun');

  label.appendChild(moonIcon);
  label.appendChild(sunIcon);

  li.appendChild(checkbox);
  li.appendChild(label);
  floatingMenu.appendChild(li);
}
