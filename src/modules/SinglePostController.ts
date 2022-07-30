export class SinglePostController {
  private readonly floatingMenu: HTMLElement;
  private readonly postSections: NodeListOf<HTMLHeadingElement>;
  private readonly menuToggler: HTMLInputElement;

  constructor() {
    this.floatingMenu = document.querySelector('.floating-menu');
    this.postSections = document.querySelectorAll('.single-post__content h3');
    this.menuToggler = document.querySelector('#postIndex');
    this.createMenu();
    this.listeners();
  }

  listeners() {
    this.menuToggler.addEventListener('change', this.toggleMenu.bind(this));
    document.addEventListener('scroll', this.closeIndex.bind(this));
  }

  closeIndex() {
    this.menuToggler.checked = false;
  }

  toggleMenu() {
    // Close all other floating windows eg., searchbox.
    // TODO: Again, find programatic way of doing this
    (this.floatingMenu.querySelector('#search-box') as HTMLInputElement).checked = false;
    document.body.style.overflow = 'auto';
  }

  createMenu() {
    const ul = document.createElement('ul');
    ul.className = 'single-post__index';

    this.postSections.forEach(headingEl => {

      const link = headingEl.textContent.replace(' ', '_').toLowerCase();
      headingEl.id = link;

      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = `#${link}`;
      a.textContent = headingEl.textContent;

      li.appendChild(a);
      ul.appendChild(li);

    });

    this.menuToggler.insertAdjacentElement('afterend', ul);
  }
}
