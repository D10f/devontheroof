import type { AbstractBlock } from 'asciidoctor';

export default (node: AbstractBlock) => {
	const { alt, target } = node.getAttributes();
	const matches = target.match(/^(.*)\.[^\.]+$/);
	const filename = matches[1];

	return `<figure>
		<picture>
			<source type="image/jxl"  srcset="/${filename}.jxl" />
			<source type="image/avif" srcset="/${filename}.avif" />
			<source type="image/webp" srcset="/${filename}.webp" />
			<img loading="lazy" srcset="/${target}" />
		</picture>
		<figcaption>${alt}</figcaption>
	</figure>`;
};
