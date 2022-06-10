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
  return function () {
    clearTimeout(timeFrame);
    timeFrame = setTimeout(fn, timeInMs);
  };
}
