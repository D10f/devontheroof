import type { AbstractBlock } from 'asciidoctor';

export default (node: AbstractBlock, { content }: { content: string }) => {
	const lang = node.getAttribute('language');
	const title = node.getAttribute('title');

	const outputHtml = `
		<div class="listingblock" data-language="${lang}" x-data="codeblock">
			<button
				class="copy-btn rotating-btn ${title ? 'mt-6' : ''}"
				:class="{ 'rotating-btn--active': copied }"
				:disabled="copied"
				@click="addToClipboard"
				x-cloak
			>
				<span>
					<svg aria-hidden="true">
						<use href="/sprite.svg#icon-clipboard" />
					</svg>
					<svg aria-hidden="true" style="transform: rotate(180deg);">
						<use href="/sprite.svg#icon-clipboard-success" />
					</svg>
				</span>
			</button>

			<figure x-ref="wrapper">
				${title ? `<figcaption>${title}</figcaption>` : ''}
				${content.replace(/tabindex="0"/, 'tabindex="-1"')}
			</figure>
		</div>
	`;

	return outputHtml;
};
