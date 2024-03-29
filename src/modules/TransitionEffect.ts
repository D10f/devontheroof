export class TransitionEffect {
  private readonly randomInitialValue: string;
  private readonly targets: NodeListOf<Element>;

  constructor(selector: string) {
    this.randomInitialValue = "}C[!8&DI^S?U";
    this.targets = document.querySelectorAll(selector);
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

      // use this if disabling observer after first pass
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
            maxDuration: 2000,
            highlight: ["#fb7158", "#f4c862e5"],
          });
          this.unobserve(el);
        }
      },
      options).observe(el);
    });
  }
}

interface ITextTransition {
  element: HTMLElement;
  newText: string;
  maxDuration?: number;
  entropy?: number;
  rate?: number;
  highlight?: string | string[] | false;
  callback?: () => void;
}

interface ITransitionCharObject {
  charCode: number;
  done: boolean;
}

/**
 * Changes the contents of the target HTML with a new value, transitioning characters individually in a random fashion.
 */
function textTransition({
  element,
  newText,
  maxDuration = 1000,
  entropy = 0.8,
  rate = 125,
  highlight = "#f4c862",
  callback,
}: ITextTransition) {
  let match = false;
  const timeout: ReturnType<typeof setTimeout> = setTimeout(
    () => (match = true),
    maxDuration
  );

  const currentTextCharCodeArray: number[] = element
    .textContent!.split("")
    .map((letter: string) => letter.charCodeAt(0));

  const newTextCharCodeArray: number[] = newText
    .split("")
    .map((letter: string) => letter.charCodeAt(0));

  let transitionTextCharCodeArray: ITransitionCharObject[] = new Array(
    newText.length
  ).fill({ charCode: 0, done: false });

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (match) {
      element.textContent = newText;
      clearTimeout(timeout);
      clearInterval(interval);
      if (callback) {
        callback();
      }
      return;
    }

    transitionTextCharCodeArray = newTextCharCodeArray.map((charCode, idx) => {
      if (
        charCode === currentTextCharCodeArray[idx] ||
        charCode === transitionTextCharCodeArray[idx]?.charCode ||
        Math.random() > entropy
      ) {
        return {
          charCode,
          done: true,
        };
      }

      // included characters: A-Z a-z 0-9 "#$%&\'()*+,-./:;<=>?@[\\]^_`{|}
      const randomNum = Math.max(32, Math.floor(Math.random() * 126));

      return {
        charCode: randomNum,
        done: false,
      };
    });

    // This checks for matches to avoid waiting for the full maxDuration when not needed
    match =
      JSON.stringify(transitionTextCharCodeArray.map((obj) => obj.charCode)) ===
      JSON.stringify(newTextCharCodeArray);

    if (!highlight) {
      element.textContent = transitionTextCharCodeArray
        .map(({ charCode }: ITransitionCharObject) =>
          String.fromCharCode(charCode)
        )
        .join("");
      return;
    }

    element.innerHTML = transitionTextCharCodeArray
      .map(({ charCode, done }: ITransitionCharObject) => {
        let color = "";

        if (highlight instanceof Array) {
          color = highlight[Math.floor(Math.random() * highlight.length)];
        }

        return done
          ? `<span>${String.fromCharCode(charCode)}</span>`
          : `<span style="color: ${color || highlight}">${String.fromCharCode(
              charCode
            )}</span>`;
      })
      .join("");
  }, rate);
}
