import type { AbstractBlock, Section } from 'asciidoctor';

type TocEntry = {
	title: string;
	id: string;
	level: number;
	children: TocEntry[];
};

const MAX_TOC_LEVEL = 3;

export default (node: AbstractBlock) => {
	const toc = node
		.getDocument()
		.getSections()
		.map((s) => buildToc(s))
		.map((t) => buildTocHtml(t))
		.join('');

	const preamble = node.getContent();

	return `
		<section id="preamble">
			${preamble}
		</section>

		<section id="toc">
			<menu class="toc">${toc}</menu>
		</section>`;
};

function buildToc(section: Section): TocEntry {
	const node = {
		id: section.getId(),
		title: section.getTitle(),
		level: section.getLevel(),
		children: [],
	} as TocEntry;

	return node.level < MAX_TOC_LEVEL
		? { ...node, children: section.getSections().map(buildToc) }
		: node;
}

function buildTocHtml({ title, id, children }: TocEntry): string {
	return `
		<li class="toc__item">
			<a href="#${id}">${title}</a>
			${children.length > 0 ? `<ul>${children.map(buildTocHtml).join('')}</ul>` : ''}
		</li>`;
}
