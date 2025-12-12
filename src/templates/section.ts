import type { Section } from 'asciidoctor';

export default (node: Section) => {
	const title = node.getTitle();
	const level = node.getLevel();
	const id = node.getId();

	const anchorHtml = `
		<a href="#${id}">
			<svg aria-hidden="true">
				<use href="/sprite.svg#icon-link" />
			</svg>
		</a>`;

	const headingHtml = `
		<header>
			<h${level + 1} id="${id}">${title}</h${level + 1}>
			${anchorHtml}
		</header>`;

	return (
		`<section class="sect${level}">` +
		headingHtml +
		node.getContent() +
		'</section>'
	);
};
