import type { AlpineComponent } from 'alpinejs';

export default () =>
	({
		previousPosition: window.scrollY,
		scrollingDownwards: false,

		handleScroll() {
			const currentPosition = window.scrollY;
			this.scrollingDownwards = currentPosition > this.previousPosition;
			this.previousPosition = currentPosition;
		},

		scrollToTop() {
			document.body.scrollIntoView({ behavior: 'smooth' });
		},
	}) as AlpineComponent<{
		previousPosition: number;
		scrollingDownwards: boolean;
		handleScroll(): void;
		scrollToTop(): void;
	}>;
