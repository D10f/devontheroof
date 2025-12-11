import type { AbstractBlock } from 'asciidoctor';

export default (node: AbstractBlock, { content }: { content: string }) => {
	const lang = node.getAttribute('language');
	const title = node.getAttribute('title');

	return `<div class="codeblock">
		<button class="codeblock__copy-btn rotating-btn ${title ? 'mt-6' : ''} js-required">
			<span class="unselectable">
				<svg aria-hidden="true">
					<use href="/sprite.svg#icon-clipboard" />
				</svg>
				<svg aria-hidden="true" style="transform: rotate(180deg);">
					<use href="/sprite.svg#icon-clipboard-success" />
				</svg>
			</span>
		</button>

		<div class="listingblock" data-language="${lang}">
			<figure>
				${title ? `<figcaption style="font-style: italic;">${title}</figcaption>` : ''}
				${content.replace(/tabindex="0"/, 'tabindex="-1"')}
			</figure>
		</div>
	</div>`;
};
