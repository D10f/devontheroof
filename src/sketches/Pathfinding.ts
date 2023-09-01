// import TilePicker from "../modules/pathfinding/web-components/tile-picker";

export default class Pathfinding {
    private sketchPreview: HTMLElement;
    private project: HTMLElement;
    private observer: IntersectionObserver;
    private modal: HTMLElement;
    private modalContent: HTMLElement;
    private isModalOpen: boolean;

    constructor() {
        this.project = document.querySelector("[data-sketch=pathfinding]");
        this.sketchPreview = this.project.querySelector(
            ".project__preview"
        ) as HTMLElement;
        this.createModal();
        this._closeModalClickHandler = this._closeModalClickHandler.bind(this);
        this._closeModalKeyboardHandler =
            this._closeModalKeyboardHandler.bind(this);
        this._attachModalHandlers = this._attachModalHandlers.bind(this);
        this.createObserver();
        this.sketchPreview
            .querySelector(".project__trigger button")
            .addEventListener("click", () => this.openModal());
    }

    private _attachModalHandlers() {
        document.addEventListener("keydown", this._closeModalKeyboardHandler);
        document.addEventListener("click", this._closeModalClickHandler);
    }

    private _removeModalHandlers() {
        document.removeEventListener("click", this._closeModalClickHandler);
        document.removeEventListener("keydown", this._closeModalKeyboardHandler);
    }

    private _closeModalClickHandler(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (!this.isModalOpen || target.className !== "modal modal--active") return;
        this.closeModal();
        this._removeModalHandlers();
    }

    private _closeModalKeyboardHandler(e: KeyboardEvent) {
        if (!this.isModalOpen || e.key === "escape") return;
        this.closeModal();
        this._removeModalHandlers();
    }

    private closeModal() {
        this.isModalOpen = false;
        this.modal.classList.remove("modal--active");
        document.body.style.overflow = "auto";
    }

    private openModal() {
        this.isModalOpen = true;
        this.modal.classList.add("modal--active");
        document.body.style.overflow = "hidden";
        setTimeout(this._attachModalHandlers, 0);
    }

    private createModal() {
        const modal = document.createElement("aside");
        modal.className = "modal";

        const modalContent = document.createElement("div");
        modalContent.className = "modal__content";

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        this.modal = modal;
        this.modalContent = modalContent;
        this.isModalOpen = false;
    }

    private createObserver() {
        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: "100px",
            threshold: 0.25,
        };

        const callback = (entries: IntersectionObserverEntry[]) => {
            const moveIntoView = entries[0].intersectionRatio > 0;

            if (!moveIntoView) return;

            import("../modules/pathfinding/web-components/tile-picker")
                .then((module) => {
                    customElements.define("tile-picker", module.default);
                    const tilePicker = document.createElement("tile-picker");
                    this.modal
                        .querySelector(".modal__content")
                        .insertAdjacentElement("beforeend", tilePicker);
                    this.observer.unobserve(this.project);
                    this.observer = null;
                })
                .catch(console.error);
        };

        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(this.project);
    }
}
