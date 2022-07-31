import { createSvgIcon } from './utils';

export class SearchController {
  private readonly searchModal: HTMLFormElement;
  private readonly searchModalTrigger: HTMLInputElement;
  private readonly searchInput: HTMLInputElement;
  private readonly searchBox: HTMLInputElement;
  private readonly searchResults: HTMLUListElement;
  private readonly endpoint: string;
  private previousQuery: string;
  private timer: ReturnType<typeof setTimeout>;
  private debounceTimeout: number;
  private focusIndex: number;

  constructor() {
    this.searchModal = document.querySelector('.search') as HTMLFormElement;
    this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
    this.searchBox = document.querySelector('.search__box') as HTMLInputElement;
    this.searchResults = document.querySelector('.search__results') as HTMLUListElement;
    this.searchModalTrigger = document.getElementById('search-box') as HTMLInputElement;

    this.previousQuery = null;
    this.endpoint = "/wp-json/content/posts";

    this.timer = null;
    this.debounceTimeout = 500;

    this.focusIndex = 0;

    this.listeners();
  }

  listeners() {
    // TODO: Add support for search without javascript
    // this.searchModal.addEventListener('submit', (e) => e.preventDefault());
    // add keyboard shortcut "Ctrl + K"
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'k' && e.ctrlKey) {
        e.preventDefault();
        this.searchModalTrigger.click();
      }
    });

    this.searchModal.addEventListener('keyup', this.handleInput.bind(this), true);
    this.searchModalTrigger.addEventListener('change', () => {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.searchResults.innerHTML = '';
      this.focusIndex = 0;
      if (this.searchModalTrigger.checked) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }

      this.toggleMenus();
    });
  }

  // closes other floating menu windows eg., post index if available
  toggleMenus() {
    const postIndexInput = document.querySelector('#postIndex') as HTMLInputElement;
    if (postIndexInput) {
      postIndexInput.checked = false;
    }
  }

  handleInput(e: KeyboardEvent) {

    if (e.key === 'Escape') {
      this.searchInput.value = '';
      this.searchModalTrigger.click();
      this.searchBox.classList.remove('search__box--loading');
      return;
    }

    if (this.searchInput.value.length === 0) {
      this.searchResults.innerHTML = '';
      this.searchBox.classList.remove('search__box--loading');
      return;
    }

    // If there are results available and the up or down keys are pressed
    if (
      this.searchResults.children.length > 0 &&
      (e.key === 'ArrowDown' || e.key == 'ArrowUp')
    ) {
      return this.navigateResults(e.key);
    }

    if (
      this.previousQuery === this.searchInput.value ||
      this.searchInput.value.length < 3
    ) {
      // avoid unnecessary queries (repeated or too short)
      return;
    }

    clearTimeout(this.timer);
    this.previousQuery = this.searchInput.value.toLowerCase();
    this.timer = setTimeout(() => {
      this.loadData();
      this.searchBox.classList.add('search__box--loading');
    }, this.debounceTimeout);
  }

  navigateResults(direction: 'ArrowDown' | 'ArrowUp') {
    if (direction === 'ArrowDown') {
      this.focusIndex = (this.focusIndex + 1) % this.searchResults.children.length;
    } else {
      this.focusIndex = this.focusIndex - 1;

      if (this.focusIndex < 0) {
        this.focusIndex = -2; // -2 is default value
        this.searchInput.focus();
        return;
      }
    }

    this.searchResults.children[this.focusIndex].querySelector('a').focus();
  }

  loadData() {
    const url = `${this.endpoint}?q=${this.previousQuery}`;

    fetch(url)
      .then((res) => res.json())
      .then((posts: any) => {
        this.processPosts(posts);
      })
      .catch(console.error)
      .finally(() => {
        this.searchBox.classList.remove('search__box--loading');
      });
  }

  processPosts(posts: any[]) {

    if (posts.length === 0) {
      this.searchResults.innerHTML = `No Results Found.`;
      return;
    }

    this.searchResults.innerHTML = '';
    const fragment = document.createDocumentFragment();

    posts.forEach(post => {
      const li = document.createElement('li');
      li.className = 'search__result-item';
      li.id = post.id.toString();

      const link = document.createElement('a');
      link.className = 'search__result-link';
      link.href = post.link;
      link.textContent = post.title;

      const categoryIcon = createSvgIcon(post.category);

      li.appendChild(link);
      li.appendChild(categoryIcon);
      fragment.appendChild(li);
    });

    // Avoid repeated updates on the DOM by using a fragment element
    this.searchResults.appendChild(fragment);

    // Update focus index allowed
    this.focusIndex = posts.length - 1;

    // focus first element if there are results
    // if (posts.length > 0) {
    //   this.searchResults.querySelector('a').focus();
    // }
  }
}
