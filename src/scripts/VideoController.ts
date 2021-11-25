export class VideoController {
  private readonly videoSection: HTMLElement;
  private readonly videoElements: NodeListOf<HTMLVideoElement>;

  constructor() {
    this.videoSection = document.querySelector(".section__scripting")!;
    this.videoElements = document.querySelectorAll("video")!;
    this.createObserver();
  }

  createObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0,
    };

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      const entry = entries[0];
      const moveIntoView = entry.intersectionRatio > 0;

      this.videoElements.forEach((video) => {
        moveIntoView ? video.play() : video.pause()
      });
    };

    new IntersectionObserver(callback, options).observe(this.videoSection);
  }
}
