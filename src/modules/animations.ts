export function pulseAnimation(selector: string) {

  // Remove potential id or class identifiers
  const className = selector.replace(/^[#\.]/, "");

  document.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains(className)) {
      target.classList.add(className + '--active');
    }
  });
  
  // document.addEventListener('focus', (e: FocusEventInit) => {

  //   const target = e.relatedTarget.activeElement;

  //   if (target.classList.contains(className)) {
  //     target.classList.add(className + '--active');
  //   }
  // });

  document.addEventListener('animationend', (e: AnimationEvent) => {
    const target = e.target as HTMLElement;

    if (e.animationName === 'pulse') {
      target.classList.remove(className + '--active');
    }
  });
}
