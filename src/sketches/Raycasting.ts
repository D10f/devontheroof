export default class Raycasting {

    private project: HTMLElement;
    private previewOverlay: HTMLElement;
    private canvas: HTMLCanvasElement;
    private observer: IntersectionObserver;
    private isPlaying: boolean;
    private sketch: any | null;
    private module: any | null;

    constructor() {
        this.project = document.querySelector('[data-sketch=raycasting]');
        this.previewOverlay = this.project.querySelector('.project__trigger');
        this.isPlaying = false;
        this.createObserver();
        this.createEvents();
    }

    private createEvents() {
        this.previewOverlay
            .querySelector('button')
            .addEventListener('click', () => {
                this.isPlaying
                    ? this.destroySketch()
                    : this.createSketch();
            });
    }

    private createSketch() {
        this.previewOverlay.classList.add('project__trigger--hidden');
        this.createCanvas();
        this.sketch = this.module({ canvas: this.canvas });
        this.isPlaying = true;
    }

    private destroySketch() {
        this.previewOverlay.classList.remove('project__trigger--hidden');
        this.canvas.remove();
        this.sketch = null;
        this.isPlaying = false;
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
                .then(module => {
                    this.module = module.default;
                    this.observer.unobserve(this.project);
                    this.observer = null;
                })
                .catch(console.error);
        };

        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this.project);
    }
}
