class PostLoader {
  constructor() {
    this.form = document.querySelector('.search');
    this.searchLabel = this.form.querySelector('.search__label');
    this.searchField = this.form.querySelector('.search__input');
    this.searchResults = this.form.querySelector('.search__results');

    this.prevQuery = '';
    this.posts = [];
    this.timer = 0;

    this.events();
  }

  events(){
    this.form.addEventListener('submit', (e) => e.preventDefault());
    this.form.addEventListener('focus', () => this.posts.length ? this.showResults() : '');
    document.addEventListener('click', () => this.hideResults());
    this.searchField.addEventListener('keyup', () => this.handleKeyPress());
  }

  loadData(){
    fetch(`https://developersojourn.site/wp-json/content/posts?q=${this.prevQuery}`)
      .then(res => res.json())
      .then(posts => {
        this.renderPosts(posts);
        this.posts = posts;
      })
      .catch(console.error);
  }

  handleKeyPress(){
    // Prevent unnecessary queries if input value hasn't changed
    if (this.prevQuery !== this.searchField.value){
      clearTimeout(this.timer);

      // if search field is empty or too short, no results should show at all
      if (!this.searchField.value
        || this.searchField.value.length < 4) return;

      // Fail-safe in case data wasn't loaded earlier for some reason.
      // if (!this.posts) this.loadData();

      this.prevQuery = this.searchField.value;
      this.timer = setTimeout(() => {
        this.loadData();
      }, 500);
    }
  }

  hideResults() {
    this.searchResults.classList.remove('search__results--show');
  }

  showResults() {
    this.searchResults.classList.add('search__results--show');
  }

  renderPosts(posts) {
    this.searchResults.innerHTML = '';

    posts.forEach(post => {
      const article = document.createElement('article');
      article.className = 'post__preview';
      article.postId = post.id;

      const h3 = document.createElement('h3');

      const a = document.createElement('a');
      a.className = 'post__permalink';
      a.textContent = post.title;
      a.href = post.link;

      const p = document.createElement('p');
      p.textContent = post.excerpt.replace('&hellip;', '...');

      h3.appendChild(a);
      article.appendChild(h3);
      article.appendChild(p);

      this.searchResults.appendChild(article);
      this.showResults();
    });
  }
}

new PostLoader();
