interface ITextTransition {
  element: HTMLElement;
  newText: string;
  maxDuration?: number;
  entropy?: number;
  rate?: number;
  highlight?: string | string[] | false;
  callback?: Function;
}

interface ITransitionCharObject {
  charCode: number;
  done: boolean;
}

/**
 * Changes the contents of the target HTML with a new value, transitioning characters individually in a random fashion.
 */
export function textTransition({
  element,
  newText,
  maxDuration = 1000,
  entropy = 0.8,
  rate = 125,
  highlight = "#f4c862",
  callback,
}: ITextTransition) {
  let match = false;
  let timeout: ReturnType<typeof setTimeout>;
  let interval: ReturnType<typeof setInterval>;

  timeout = setTimeout(() => (match = true), maxDuration);

  const currentTextCharCodeArray: number[] = element
    .textContent!.split("")
    .map((letter: string) => letter.charCodeAt(0));

  const newTextCharCodeArray: number[] = newText
    .split("")
    .map((letter: string) => letter.charCodeAt(0));

  let transitionTextCharCodeArray: ITransitionCharObject[] = new Array(
    newText.length
  ).fill({ charCode: 0, done: false });

  interval = setInterval(() => {
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
