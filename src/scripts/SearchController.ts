enum Tags {
  NGINX = "nginx",
  WORDPRESS = "wordpress",
  MONGODB = "mongodb",
  BASH = "bash",
  PWA = "pwa",
}

interface IPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  tags: Tags[];
}

export class SearchController {
  private readonly searchForm: HTMLFormElement;
  private readonly searchInput: HTMLInputElement;
  private readonly searchOutput: HTMLOutputElement;
  private previousQuery: string | null;
  private results: HTMLElement[];
  private timer: ReturnType<typeof setTimeout>;
  private debounceTimeout: number;
  private endpoint: string;

  constructor() {
    this.searchForm = document.querySelector(".search-form")!;
    this.searchInput = document.querySelector(".search-form__input")!;
    this.searchOutput = document.querySelector(".search-form__results")!;
    this.previousQuery = null;
    this.results = [];
    this.timer = setTimeout(() => {});
    this.debounceTimeout = 500;
    this.endpoint = "https://developersojourn.site/wp-json/content/posts";
    this.listeners();
  }

  listeners() {
    this.searchForm.addEventListener("submit", (e) => e.preventDefault());
    this.searchForm.addEventListener("keyup", (e) => this.handleInput(e), true);
  }

  handleInput(e: KeyboardEvent) {

    if (e.key === 'Escape') {
      this.searchOutput.innerHTML = '';
    }

    if (
      this.previousQuery === this.searchInput.value ||
      this.searchInput.value.length <= 3
    ) {
      return; // avoid unnecessary queries (repeated or too short)
    }

    clearTimeout(this.timer); // restart debounce timer
    this.previousQuery = this.searchInput.value;
    this.timer = setTimeout(() => this.loadData(), this.debounceTimeout);
  }

  loadData() {
    const url = this.endpoint + "?q=" + this.previousQuery;
    fetch(url)
      .then((res) => res.json())
      .then((posts: IPost[]) => {
        this.results = this.processPosts(posts);
        this.renderPosts();
      })
      .catch(console.error);
  }

  processPosts(posts: IPost[]) {
    this.searchOutput.innerHTML = "";

    return posts.map((post) => {
      const article = document.createElement("article");
      article.className = "search-form__results-card";
      article.id = post.id.toString();

      const title = document.createElement("h3");
      const titleLink = document.createElement("a");

      titleLink.className = "search-form__results-link";
      titleLink.textContent = post.title;
      titleLink.href = post.link;

      // const excerpt = document.createElement("p");
      // excerpt.textContent = post.excerpt.replace("&hellip;", "...");
      
      title.appendChild(titleLink);
      article.appendChild(title);
      // article.appendChild(excerpt);
      return article;
    });
  }

  renderPosts() {
    this.results.forEach(post => {
      this.searchOutput.appendChild(post);
    });
  }
}
