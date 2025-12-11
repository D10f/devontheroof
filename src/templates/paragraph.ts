import type { AbstractBlock } from 'asciidoctor';

export default (node: AbstractBlock) => {
	const lineThroughRe = /<span class="line-through">([^<]*)<\/span>/g;

	const content = node
		.getContent()
		.replaceAll(lineThroughRe, '<del>$1</del>');

	return `<p>${content}</p>`;
};
