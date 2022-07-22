export function hasReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileDevice(): RegExpMatchArray {
  return navigator.userAgent.match(
    /(Android|iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry)/i
  );
}

export function debounce(fn: Function, timeInMs: number): Function {
  let timeFrame: number;
  return function() {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}

export function createSvgIcon(iconName: string) {
  const svg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  const use = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "use"
  );

  use.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    `/wp-content/themes/devontheroof/assets/images/sprite.svg#icon-${iconName}`
  );

  svg.appendChild(use);

  return svg;
}
