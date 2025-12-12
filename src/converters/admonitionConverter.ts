import type { CustomConverterFactoryFn } from '@d10f/asciidoc-astro-loader';

export const admonitionConverter: CustomConverterFactoryFn<object> = () => {
	return () => {
		let admonitionCounter = 0;

		return {
			nodeContext: 'admonition',
			convert(node) {
				const type = node.getAttribute('name');
				const content = node
					.getSourceLines()
					.join('')
					.replace(/`([^`]+?)`/g, '<code>$1</code>')
					.replace(
						/([^\[\s]+)\[([^\]]+)\]/g,
						'<a href="$1" target="_blank">$2</a>',
					);

				const position =
					admonitionCounter++ % 2 === 0 ? 'is-left' : 'is-right';

				return `
					<aside class="admonitionblock ${position} ${type}">
						<header>
							<svg xmlns="http://www.w3.org/2000/svg">
								<use href="/sprite.svg#icon-${type}" />
							</svg>
						</header>
						<p>${content}</p>
					</aside>`;
			},
		};
	};
};
