import type { AlpineComponent } from 'alpinejs';

export default () =>
	({
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
	}) as AlpineComponent<{ copied: boolean; addToClipboard(): void }>;
