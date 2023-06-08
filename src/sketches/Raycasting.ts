export default class Raycasting {

    private project: HTMLElement;
    private previewOverlay: HTMLElement;
    private canvas: HTMLCanvasElement;
    private observer: IntersectionObserver;
    private isPlaying: boolean;
    private sketch: WebAssembly.Module | null;

    constructor() {
        this.project = document.querySelector('[data-sketch=raycasting]');
        this.previewOverlay = this.project.querySelector('.project__trigger');
        this.isPlaying = false;
        this.sketch = null;
        this.createCanvas();
        this.createObserver();
        this.createEvents();
    }

    private createEvents() {
        this.previewOverlay
            .querySelector('button')
            .addEventListener('click', () => {
                this.isPlaying ? this.pause() : this.play();
            });
    }

    private play() {
        this.previewOverlay.classList.add('project__trigger--hidden');
        this.isPlaying = true;
        // @ts-ignore
        this.sketch.resumeMainLoop();
        // @ts-ignore
        this.sketch._reset_frame_time();
    }

    private pause() {
        this.previewOverlay.classList.remove('project__trigger--hidden');
        this.isPlaying = false;
        // @ts-ignore
        this.sketch.pauseMainLoop();
    }

    private createCanvas() {
        const canvas = document.createElement('canvas');

        canvas.setAttribute('width', '535px');
        canvas.setAttribute('height', '250px');

        this.project
            .querySelector('.project__preview')
            .insertAdjacentElement('beforeend', canvas);

        this.canvas = canvas;
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
                .then(module => module.default({ canvas: this.canvas }))
                .then((wasm: WebAssembly.Module) => {
                    this.sketch = wasm;
                    setTimeout(() => {
                        // @ts-ignore
                        wasm.pauseMainLoop();
                    }, 0);
                    this.observer.unobserve(this.project);
                    this.observer = null;
                })
                .catch(console.error);
        };

        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this.project);
    }
}
