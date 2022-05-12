export function pulseAnimation(selector: string) {
  // Remove potential id or class identifiers
  const className = selector.replace(/^[#\.]/, "");
  const elements = document.querySelectorAll(selector);

  // document.addEventListener('mouseover', (e: MouseEvent) => {
  //   const target = e.target as HTMLElement;

  //   if (target.classList.contains(className)) {
  //     target.classList.add(className + '--active');
  //   }
  // });

  elements.forEach((el) => {
    el.addEventListener("focus", addClassName);
    el.addEventListener("mouseover", addClassName);
  });

  function addClassName(e: Event) {
    (e.target as HTMLElement).classList.add(className + "--active");
  }

  document.addEventListener("animationend", (e: AnimationEvent) => {
    const target = e.target as HTMLElement;

    if (e.animationName === "pulse") {
      target.classList.remove(className + "--active");
    }
  });
}
