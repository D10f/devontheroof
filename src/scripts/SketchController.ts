interface ISketch {
  destroy: () => null;
}

/**
 * Manages 2D and 3D sketches so that only is running at the same time
 */
export class SketchController {
  private readonly graphicsSection: HTMLElement;
  private readonly canvasTriggerBtn: NodeListOf<HTMLButtonElement>;
  private currentSketch: ISketch | null;
  private currentCanvas: string | null;
  private observer: IntersectionObserver;
  private p5: any;
  private hangingLightbulb: any;
  private steeringBehaviors: any;
  private earth: any;

  constructor() {
    this.canvasTriggerBtn = document.querySelectorAll(
      ".project__info button"
    )!;
    this.graphicsSection = document.querySelector(".section__graphics")!;
    this.currentSketch = null;
    this.currentCanvas = null;
    this.observer = this.createObserver();
    this.listen();
  }

  createObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "100px",
      threshold: 0.25,
    };

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      const entry = entries[0];
      const moveIntoView = entry.intersectionRatio > 0;

      if (!moveIntoView) {
        return;
      }

      Promise.all([
        // @ts-ignore
        import("p5"),
        // @ts-ignore
        import("./sketches/hangingLightbulb.js"),
        // @ts-ignore
        import("./sketches/steeringBehaviors.js"),
        // @ts-ignore
        import("./sketches/earth/index.js"),
      ])
        .then((scripts) => {
          const [p5, hangingLightbulb, steeringBehaviors, earth] = scripts;

          this.p5 = p5.default;
          this.hangingLightbulb = hangingLightbulb.default;
          this.steeringBehaviors = steeringBehaviors.default;
          this.earth = earth.default;

          this.observer.unobserve(this.graphicsSection);
        })
        .catch(console.error);
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.graphicsSection);
    return observer;
  }

  listen() {
    this.canvasTriggerBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleBtnText(btn.getAttribute("data-id")!);
        this.changeSketch(btn.getAttribute("data-id")!);
        btn.blur();
      });
    });
  }

  toggleBtnText(canvasId: string) {
    this.canvasTriggerBtn.forEach((btn) => {
      if (btn.getAttribute("data-id") === canvasId) {
        btn.textContent = btn.textContent === "Play" ? "Stop" : "Play";
      } else {
        btn.textContent = "Play";
      }
    });
  }

  changeSketch(canvasId: string) {
    if (this.currentSketch) {
      this.currentSketch = this.currentSketch.destroy();
    }

    if (this.currentCanvas === canvasId) {
      this.currentCanvas = null;
      return;
    }

    this.playSketch(canvasId);
  }

  playSketch(canvasId: string) {
    switch (canvasId) {
      case "lightbulb":
        this.currentSketch = new this.p5(
          this.hangingLightbulb,
          document.getElementById(canvasId)
        );
        break;
      case "steering":
        this.currentSketch = new this.p5(
          (p: any) => this.steeringBehaviors(p, "Hire Me!"),
          document.getElementById(canvasId)
        );
        break;
      case "earth":
        this.earth.animate();
        this.currentSketch = { destroy: this.earth.destroy };
        break;
      default:
        return;
    }

    this.currentCanvas = canvasId;
  }
}
