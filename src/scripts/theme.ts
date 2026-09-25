import type { AlpineComponent } from 'alpinejs';

export default () =>
	({
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
	}) as AlpineComponent<{ theme: string; init(): void; toggle(): void }>;
