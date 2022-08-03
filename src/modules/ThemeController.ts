import { prefersDarkMode, createSvgIcon } from './utils';

// id of the checkbox input to toggle between themes
const CHECKBOX_ID = 'theme-switcher';

export class ThemeController {
  private theme: string | null;

  constructor() {
    this.getBrowserPreferences();
    this.applyTheme();
    this.addThemeToggler();
  }

  getTheme() {
    return localStorage.getItem('theme');
  }

  setTheme(value: string) {
    localStorage.setItem('theme', value);
  }

  getBrowserPreferences() {
    let theme = this.getTheme();

    if (!theme) {
      theme = prefersDarkMode()
        ? 'dark'
        : 'light';

      this.setTheme(theme);
    }

    this.theme = theme;
  }

  applyTheme() {
    if (this.theme === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }

  switchTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }

    this.setTheme(this.theme);
    this.applyTheme();
  }

  addThemeToggler() {
    // Get reference to the floating menu where button is added
    const floatingMenu = document.querySelector('.floating-menu__menu');

    const li = document.createElement('li');
    li.className = 'floating-menu__item tooltip tooltip--left tooltip--hide-on-md';
    li.setAttribute('data-tooltip', 'Toggle light/dark theme');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = CHECKBOX_ID;

    const label = document.createElement('label');
    label.className = 'floating-menu__button';
    label.setAttribute('for', CHECKBOX_ID);
    label.setAttribute('tabindex', "0");

    const moonIcon = createSvgIcon('moon');
    const sunIcon = createSvgIcon('sun');

    label.appendChild(moonIcon);
    label.appendChild(sunIcon);

    li.appendChild(checkbox);
    li.appendChild(label);
    floatingMenu.appendChild(li);


    /* Add change event to toggle dark class on body element */

    // checkbox.addEventListener('change', () => {
    // });

    checkbox.addEventListener('change', () => {
      this.switchTheme()
      if (checkbox.checked) {
        li.setAttribute('data-tooltip', 'Light theme');
      } else {
        li.setAttribute('data-tooltip', 'Dark theme');
      }
    });

    /* Check if prefers dark theme is true and immediately apply dark theme */

    if (this.theme === 'dark') {
      checkbox.checked = true;
      li.setAttribute('data-tooltip', 'Light theme');
    } else {
      li.setAttribute('data-tooltip', 'Dark theme');
    }
  }
}
