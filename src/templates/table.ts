import type { Table } from 'asciidoctor';

export default (node: Table) => {
	const headRows = node
		.getHeadRows()
		.map((row) => {
			const cells = row
				.map((cell) => {
					const content = cell.getContent();
					return `<th>${content}</th>`;
				})
				.join('');

			return `<tr>${cells}</tr>`;
		})
		.join('');

	const bodyRows = node
		.getBodyRows()
		.map((row) => {
			const cells = row
				.map((cell) => {
					const content = cell.getContent();
					return `<td>${content}</td>`;
				})
				.join('');

			return `<tr>${cells}</tr>`;
		})
		.join('');

	const table = `
		<div class="tableblock-wrapper">
			<table class="tableblock frame-all grid-all fit-content">
				<thead>
					${headRows}
				</thead>
				<tbody>
					${bodyRows}
				</tbody>
			</table>
		</div>
	`;

	return table;
};
