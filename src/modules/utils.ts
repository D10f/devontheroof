export function prefersDarkMode(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function hasReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileDevice(): RegExpMatchArray {
  return navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
  );
}

export function debounce(fn: () => void, timeInMs: number) {
  let timeFrame: ReturnType<typeof setTimeout>;
  return function () {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}

export function throttle(fn: () => void, timeInMs: number) {
  let throttle = false;

  return function () {
    if (throttle) {
      return;
    }

    fn();
    throttle = true;
    setTimeout(() => {
      throttle = false;
    }, timeInMs);
  };
}

export function createSvgIcon(iconName: string) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `/wp-content/themes/devontheroof/assets/images/sprite.svg#icon-${iconName}`
  );

  svg.style.pointerEvents = "none";

  svg.appendChild(use);

  return svg;
}

export function styleElement(
  element: HTMLElement | SVGElement,
  styles: string
) {
  let rules = styles.trim().replace(/\t+/, "").replace(/\n+/, "").split(";");

  for (const rule of rules) {
    if (rule === "") continue;

    let [key, value] = rule.trim().split(":");
    key = key.replace(/\-(\w)/, (_, letter) => letter.toUpperCase());
    element.style[key] = value.trim();
  }
}
