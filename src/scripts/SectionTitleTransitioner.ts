import { textTransition } from "./textTransition";

export class SectionTitleTransitioner {
  private readonly randomInitialValue: string = "}C[!8&DI^S?U";
  private readonly targets: NodeListOf<Element> = document.querySelectorAll('.transition');
  // private readonly targets: Element[] = [
  //   ...document.querySelectorAll(".section__title")!,
  //   document.querySelector(".section__header-title")!,
  // ];

  constructor() {
    console.log(this.targets);
    this.createObservers();
  }

  createObservers() {
    const options: IntersectionObserverInit = {
      root: window.document,
      rootMargin: "0px",
      threshold: 0.0,
    };

    this.targets.forEach((el: Element) => {
      const originalText = el.textContent as string;
      el.textContent = this.randomInitialValue;

      // use this is disabling observer after first pass
      new IntersectionObserver(function (
        this: IntersectionObserver,
        entries: IntersectionObserverEntry[]
      ) {
        // new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        const entry: IntersectionObserverEntry = entries[0];

        // el.textContent = this.randomInitialValue;

        if (entry.isIntersecting) {
          textTransition({
            element: el as HTMLElement,
            newText: originalText,
            maxDuration: 1000,
            highlight: ["#fb7158", "#f4c862e5"],
          });
          this.unobserve(el);
        }
      },
      options).observe(el);
    });
  }
}
