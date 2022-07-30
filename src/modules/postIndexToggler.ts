import { createSvgIcon } from './utils';

export function postIndexToggler(checkboxId = 'postIndex') {
  const floatingMenu = document.querySelector('.floating-menu__menu');

  const li = document.createElement('li');
  li.className = 'floating-menu__item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = checkboxId;

  const label = document.createElement('label');
  label.className = 'floating-menu__button';
  label.setAttribute('for', checkboxId);

  const hamburgerIcon = createSvgIcon('hamburger');
  const closeIcon = createSvgIcon('x');

  label.appendChild(hamburgerIcon);
  label.appendChild(closeIcon);

  li.appendChild(checkbox);
  li.appendChild(label);

  floatingMenu.appendChild(li);
}
