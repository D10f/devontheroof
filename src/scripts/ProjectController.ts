export class ProjectController {
  constructor(
    private readonly targets: NodeListOf<HTMLElement> = document.querySelectorAll(
      ".highlight"
    )!,
  ) {
    this.createObservers();
  }

  createObservers() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0,
    };

    this.targets.forEach((el: HTMLElement) => {

      const randomDelayInMs = this.randomDelayInMs;

      new IntersectionObserver(function (this: IntersectionObserver, entries: IntersectionObserverEntry[]) {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          return;
        }

        setTimeout(() => {
          el.classList.add('highlight--visible');
        }, randomDelayInMs());

        this.unobserve(el);

      }, options).observe(el);
    });
  }

  randomDelayInMs() {
    return Math.floor(Math.random() * 1000 + 250);
  }
}