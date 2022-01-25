export class SinglePostController {

  private readonly postContent: HTMLElement;
  private readonly dropdownMenu: HTMLUListElement;
  private tableOfContents: NodeListOf<HTMLHeadingElement>;

  constructor() {
    this.postContent = document.querySelector('.single-post__content')!;
    this.dropdownMenu = document.querySelector('.dropdown')!;
    this.tableOfContents = this.loadTableOfContents();
    this.populatePostIndexes();
    this.listeners();
  }

  listeners() {
    document.addEventListener('click', this.dropdownClickListener.bind(this));
    document.addEventListener('keydown', this.dropdownKeyboardListener.bind(this));
  }

  dropdownClickListener(e: MouseEvent) {
    const target = <HTMLElement>e.target;
    if (target === this.dropdownMenu) {
      return;
    }
    
    if (target.localName === 'svg' || target.localName === 'use') {
      this.dropdownMenu.classList.toggle('dropdown--visible');
    } else {
      this.dropdownMenu.classList.remove('dropdown--visible');
    }
  }
  
  dropdownKeyboardListener(e: KeyboardEvent) {
    if (e.code !== 'Escape') {
      return;
    }
    this.dropdownMenu.classList.remove('dropdown--visible');
  }

  loadTableOfContents() {
    if (!this.postContent || !this.dropdownMenu) {
      throw new Error('Could not read metadata');
    }
    return this.postContent.querySelectorAll('h3');
  }

  populatePostIndexes() {
    this.tableOfContents.forEach((title: HTMLElement) => {
      title.id = title.textContent!.split(' ').join('-') ;

      const li = document.createElement('li');
      li.className = "dropdown__item";

      const a = document.createElement('a');
      a.href = `#${title.id}`;
      a.textContent = title.textContent;

      li.appendChild(a);
      this.dropdownMenu.appendChild(li);
    });
  }
}