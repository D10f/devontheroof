class NavbarController {
  constructor(isMobileDevice) {
    this.navbar = document.getElementById('nav');
    this.menu   = document.getElementById('nav__menu');
    this.header = document.getElementById('header');
    this.timer;

    this.navbar.style.position = 'fixed';

    this.listen();
  }

  listen() {
    this.navbar.addEventListener('click', () => this.updateMenu());
    window.addEventListener('scroll', () => this.updateNavbar());
  }

  updateNavbar() {
    // TODO: Implement throttle for this function call
    // At the top, navbar and menu are visible
    if (window.scrollY === 0 && !this.isMobileDevice) {
      this.navbar.className = 'nav';
      this.menu.className = 'nav__menu';
      this.header.className = 'header';
    } else {
      // Hidden elsewhere...
      this.navbar.className = 'nav nav--hide';
      this.menu.className = 'nav__menu nav__menu--hide';
      this.header.className = 'header header--hide';
    }
  }

  updateMenu() {
    // ...until they are clicked
    if (this.menu.className === 'nav__menu nav__menu--hide') {
      this.navbar.className = 'nav nav--small';
      this.menu.classList.remove('nav__menu--hide');
    }
  }
}

export default NavbarController;
