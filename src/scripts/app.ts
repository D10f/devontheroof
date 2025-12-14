import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
	Alpine.data('theme', () => ({
		theme: '',
		init() {
			const preferredTheme = localStorage.getItem('theme') ?? '';
			if (['dark', 'light'].includes(preferredTheme)) {
				this.theme = preferredTheme;
			} else if (
				window.matchMedia('(prefers-color-scheme: dark)').matches
			) {
				this.theme = 'dark';
			} else {
				this.theme = 'light';
			}

			if (this.theme === 'light') {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}

			window.localStorage.setItem('theme', this.theme);
		},
		toggle() {
			this.theme = this.theme === 'light' ? 'dark' : 'light';
			document.documentElement.classList.toggle('dark');
			localStorage.setItem('theme', this.theme);
		},
	}));

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
