export class Highlighter {

  private readonly targets: NodeListOf<HTMLElement>

  constructor(selector: string) {
    this.targets = document.querySelectorAll(selector);
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
      const randomVariant = this.randomVariant;

      new IntersectionObserver(function (
        this: IntersectionObserver,
        entries: IntersectionObserverEntry[]
      ) {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          return;
        }

        setTimeout(() => {
          el.classList.add(randomVariant());
        }, randomDelayInMs(250, 1000));

        this.unobserve(el);
      },
        options).observe(el);
    });
  }

  randomDelayInMs(min: number = 0, max: number = 1000) {
    return Math.floor(Math.random() * max + min);
  }

  randomVariant() {
    const randomInt = Math.floor(Math.random() * 4 + 1);
    return `highlight--visible-${randomInt}`;
  }
}
