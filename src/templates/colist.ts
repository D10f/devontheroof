import type { AbstractBlock, ListItem } from 'asciidoctor';

export default (node: AbstractBlock) => {
	const rows = node.getBlocks().map((block: ListItem, idx) => {
		return `<li data-colist="${idx + 1}"><p>${block.getText()}</p></li>`;
	});

	return `<ol class="colist arabic">${rows.join('')}</ol>`;
};
