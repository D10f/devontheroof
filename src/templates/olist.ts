import type { List } from 'asciidoctor';

export default (node: List) => {
	const lineThroughRe = /<span class="line-through">([^<]*)<\/span>/g;

	const items = node.getItems().map((item) => {
		const text = item.getText().replaceAll(lineThroughRe, '<del>$1</del>');
		return `<li><p>${text}</p></li>`;
	});

	return `<div class="olist ${node.getStyle()}">
		<ol>${items.join('')}</ol>
	</div>`;
};
