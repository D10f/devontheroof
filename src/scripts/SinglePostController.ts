export class SinglePostController {

  private readonly post: HTMLElement;
  private readonly sideMenu: HTMLElement;
  private readonly postHeader: HTMLElement;
  private postHeaderPosY: number;

  constructor() {
    // document.addEventListener('DOMContentLoaded', this.loadTableOfContents, { once: true });
    this.post = document.querySelector('.post-content')!;
    this.sideMenu = document.querySelector('.post-index')!;
    this.postHeader = document.querySelector('.post-header')!;
    this.postHeaderPosY = this.postHeader.getBoundingClientRect().y;
    this.loadTableOfContents();
    this.listeners();
  }

  listeners() {
    document.addEventListener('scroll', () => this.scrollBehavior());
  }

  loadTableOfContents() {
    if (!this.post || !this.sideMenu) {
      console.log(this.post, this.sideMenu)
      return;
    }

    const ul = document.createElement('ul');

    this.post.querySelectorAll('h3').forEach((title: HTMLElement) => {
      title.id = title.textContent!.split(' ').join('-') ;

      const li = document.createElement('li');
      li.className = "post-index__link";

      const a = document.createElement('a');
      a.href = `#${title.id}`;
      a.textContent = title.textContent;

      li.appendChild(a);
      ul.appendChild(li);
    });

    this.sideMenu.appendChild(ul);
  }

  scrollBehavior() {
    if (window.scrollY >= this.postHeaderPosY) {
      this.postHeader.classList.add('fixed');
    } else {
      this.postHeader.classList.remove('fixed');
    }
  }
}