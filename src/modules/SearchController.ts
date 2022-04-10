interface IPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  category: string;
}

// TODO: Environment variables for dev and prod builds

export class SearchController {
  private readonly searchForm: HTMLFormElement;
  private readonly searchInput: HTMLInputElement;
  private readonly searchOutput: HTMLOutputElement;
  private readonly searchResults: HTMLOutputElement;
  private previousQuery: string | null;
  private results: HTMLElement[];
  private timer: ReturnType<typeof setTimeout>;
  private debounceTimeout: number;
  private endpoint: string;

  constructor() {
    this.searchForm = document.querySelector(".search")!;
    this.searchInput = document.querySelector(".search__input")!;
    this.searchOutput = document.querySelector(".search__output")!;
    this.searchResults = document.querySelector(".search__results")!;
    this.previousQuery = null;
    this.results = [];
    this.timer = setTimeout(() => {});
    this.debounceTimeout = 500;
    // this.endpoint = "/wp-json/content/posts";
    this.endpoint = "/wp-json/content/posts";
    this.listeners();
  }

  listeners() {
    this.searchForm.addEventListener("submit", (e) => e.preventDefault());
    // this.searchForm.addEventListener("keyup", (e) => this.handleInput(e), true);
    document.addEventListener("keyup", (e) => this.handleInput(e), true);
    document.addEventListener("click", (e) => this.handleClick(e), true);
  }

  // Check for click outside
  handleClick(e: MouseEvent) {
    const target = <HTMLElement>e.target;

    if (
      target === this.searchForm ||
      target === this.searchInput ||
      target === this.searchOutput ||
      target === this.searchResults
    ) {
      return;
    }

    this.searchOutput.classList.remove("search__output--show");
  }

  handleInput(e: KeyboardEvent) {
    if (e.key === "Escape" || this.searchInput.value.length === 0) {
      // this.searchResults.innerHTML = "";
      this.searchOutput.classList.remove("search__output--show");
      return;
    }

    if (
      this.previousQuery === this.searchInput.value ||
      this.searchInput.value.length < 3
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
    this.searchResults.innerHTML = "";

    return posts.map((post) => {
      const li = document.createElement("li");
      li.className = `blog-card gradient--${post.category}`;
      li.id = post.id.toString();

      const link = document.createElement("a");
      link.className = "blog-card__link";
      link.href = post.link;

      const linkText = document.createElement("span");
      linkText.className = "blog-card__text";
      linkText.textContent = post.title;

      const svgEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

      const useEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
      );

      useEl.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        `https://devontheroof.top/wp-content/themes/devontheroof/assets/images/sprite.svg#icon-${post.category}`
        // `http://devontheroof.local/wp-content/themes/devontheroof/assets/images/sprite.svg#icon-${post.category}`
      );

      svgEl.appendChild(useEl);

      link.appendChild(linkText);
      svgEl.appendChild(useEl);

      li.appendChild(link);
      li.appendChild(svgEl);

      return li;
    });
  }
  renderPosts() {
    // this.searchOutput.classList.remove('search__results--hide');
    this.searchOutput.classList.add("search__output--show");

    if (this.results.length === 0) {
      this.searchResults.innerHTML = `<p>No posts found.</p>`;
    }

    this.results.forEach((post) => {
      this.searchResults.appendChild(post);
    });
  }
}
