import type { Block } from 'asciidoctor';

export default (node: Block) => {
	const type = node.getAttribute('name');
	const content = node
		.getSourceLines()
		.join('')
		.replace(/`([^`]+?)`/g, '<code>$1</code>')
		.replace(
			/([^\[\s]+)\[([^\]]+)\]/g,
			'<a href="$1" target="_blank">$2</a>',
		);

	return `
		<aside class="admonitionblock ${type}">
			<header>
				<svg xmlns="http://www.w3.org/2000/svg">
					<use href="/sprite.svg#icon-${type}" />
				</svg>
			</header>
			<p>${content}</p>
		</aside>`;
};
