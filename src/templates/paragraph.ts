import type { Block } from 'asciidoctor';

export default (node: Block) => {
	const lineThroughRe = /<span class="line-through">([^<]*)<\/span>/g;

	const content = node
		.getContent()
		.replaceAll(lineThroughRe, '<del>$1</del>');

	return `<p class="${node.getRoles().join('')}">${content}</p>`;
};
