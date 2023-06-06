import { createSvgIcon } from "../modules/utils";

export default class Raycasting {

    private module: any;
    private sketch: any;
    private sketchOverlay: HTMLElement;
    private project: HTMLElement;
    private canvas: HTMLCanvasElement;
    private observer: IntersectionObserver;

    constructor() {
        this.project = document.querySelector('[data-sketch=raycasting]');
        this.canvas = this.createCanvas();
        this.observer = this.createObserver();
        this.sketchOverlay = this.attachEvents();
    }

    private createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', '535px');
        canvas.setAttribute('height', '250px');

        this.project
            .querySelector('.project__preview')
            .insertAdjacentElement('beforeend', canvas);

        return canvas;
    }

    private attachEvents() {
        // const button = document.createElement('button');
        // button.className = 'btn btn--with-icon';
        // button.textContent = 'Play';
        // button.insertAdjacentElement('beforeend', createSvgIcon('controller-play'));

        // this.project
        //     .querySelector('.project__footer')
        //     .insertAdjacentElement('afterbegin', button);

        // button.addEventListener('click', (e: MouseEvent) => this.togglePlayButton(e));

        const sketchOverlay = this.project.querySelector('.project__trigger') as HTMLElement;

        sketchOverlay
            .querySelector('button')
            .addEventListener('click', () => this.togglePlay());

        return sketchOverlay;
    }

    private togglePlay() {
        // const button = e.target as HTMLButtonElement;
        // const isPlaying = button.textContent === 'Pause';

        // if (isPlaying) {
        //     button.textContent = 'Play';
        //     button.insertAdjacentElement('beforeend', createSvgIcon('controller-play'));
        //     // TODO: Create destroy canvas function
        // } else {
        //     button.textContent = 'Pause';
        //     button.insertAdjacentElement('beforeend', createSvgIcon('controller-stop'));
        //     // TODO: Create create canvas function
        // }

        this.sketchOverlay.classList.toggle('project__trigger--hidden');
        this.sketch._toggle_play();
    }

    private createObserver() {

        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '100px',
            threshold: 0.25
        };

        const callback = (entries: IntersectionObserverEntry[]) => {

            const moveIntoView = entries[0].intersectionRatio > 0;

            if (!moveIntoView) return;

            import('../../assets/raycasting.js')
                .then(module => {
                    this.module = module;
                    return module.default({ canvas: this.canvas });
                })
                .then(wasm => {
                    this.sketch = wasm;
                    this.observer.unobserve(this.project);
                    this.observer = null;
                    setTimeout(() => this.sketch._toggle_play(), 0);
                })
                .catch(console.error);
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.project);
        return observer;
    }
}
