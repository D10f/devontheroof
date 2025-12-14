import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
	Alpine.data('codeblock', () => ({
		copied: false,
		addToClipboard() {
			let str = '';

			const lines = this.$refs.wrapper.querySelectorAll('span.line');

			lines.forEach((line) => {
				if (line.classList.contains('remove')) return;

				const tokens = Array.from(line.children)
					.filter((span) => !span.classList.contains('unselectable'))
					.map((span) => span.textContent)
					.join('');

				str += tokens + '\n';
			});

			navigator.clipboard.writeText(str.trimEnd()).then(() => {
				this.copied = true;
				setTimeout(() => {
					this.copied = false;
				}, 2500);
			});
		},
	}));

	Alpine.data('scroll', () => ({
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
	}));
};
