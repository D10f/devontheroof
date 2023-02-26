import { createSvgIcon } from './utils';

interface ISketch {
  destroy: () => null;
}

const STEERING_SKETCH_TEXT = "Hire Me!";

/**
 * Manages 2D and 3D sketches so that only is running at the same time
 */
export class SketchController {
  private readonly graphicsSection: HTMLElement;
  private readonly projects: NodeListOf<HTMLElement>;
  // private readonly canvasTriggerBtn: NodeListOf<HTMLButtonElement>;
  private readonly canvasTriggerBtns: HTMLButtonElement[];
  private currentSketch: ISketch | null;
  private currentCanvas: string | null;
  private observer: IntersectionObserver;
  private p5: any;
  private hangingLightbulb: any;
  private steeringBehaviors: any;
  private earth: any;

  constructor() {
    this.projects = document.querySelectorAll("[data-sketch]");
    this.graphicsSection = document.getElementById("graphics")!;
    // this.graphicsProjects = this.graphicsSection.querySelectorAll('')
    // this.canvasTriggerBtn = document.querySelectorAll(".project__info button")!;
    this.canvasTriggerBtns = this.createTriggerBtns();
    this.currentSketch = null;
    this.currentCanvas = null;
    this.observer = this.createObserver();
    this.listen();
  }

  createTriggerBtns() {
    return Array.from(this.projects).map((project) => {
      const sketch = project.getAttribute("data-sketch");

      const button = document.createElement("button");
      button.className = "btn btn--with-icon";
      button.textContent = "Play";
      button.insertAdjacentElement('beforeend', createSvgIcon('controller-play'));
      button.setAttribute("data-id", sketch);

      // Append button at the footer of project
      project
        .querySelector(".project__footer")
        .insertAdjacentElement("afterbegin", button);

      return button;
    });
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
        // eslint-disable-next-line
        // @ts-ignore
        import("p5"),
        // eslint-disable-next-line
        // @ts-ignore
        import("../sketches/lightbulb.js"),
        // eslint-disable-next-line
        // @ts-ignore
        import("../sketches/steering.js"),
        // eslint-disable-next-line
        // @ts-ignore
        import("../sketches/earth/index.js"),
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
    this.canvasTriggerBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.toggleBtnText(btn.getAttribute("data-id")!);
        this.changeSketch(btn.getAttribute("data-id")!);
        btn.blur();
      });
    });
  }

  toggleBtnText(canvasId: string) {
    this.canvasTriggerBtns.forEach((btn) => {
      if (btn.getAttribute("data-id") === canvasId) {
        // btn.textContent = btn.textContent === "Play" ? "Stop" : "Play";
        if (btn.textContent.startsWith('Play')) {
          btn.innerHTML = 'Stop';
          btn.insertAdjacentElement('beforeend', createSvgIcon('controller-stop'));
        } else {
          btn.innerHTML = 'Play';
          btn.insertAdjacentElement('beforeend', createSvgIcon('controller-play'));
        }
      } else {
        btn.innerHTML = 'Play';
        btn.insertAdjacentElement('beforeend', createSvgIcon('controller-play'));
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
          (p: any) => this.steeringBehaviors(p, STEERING_SKETCH_TEXT),
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
