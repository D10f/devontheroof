import type { List } from 'asciidoctor';

export default (node: List) => {
	const lineThroughRe = /<span class="line-through">([^<]*)<\/span>/g;

	const items = node.getItems().map((item) => {
		const text = item.getText().replaceAll(lineThroughRe, '<del>$1</del>');
		return `<li><p>${text}</p></li>`;
	});

	const startCounter = node.getAttribute('start') ?? 1;

	return `<div class="olist ${node.getStyle()}">
		<ol start="${startCounter}">${items.join('')}</ol>
	</div>`;
};
