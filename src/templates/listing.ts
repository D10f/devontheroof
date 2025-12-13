import type { AbstractBlock } from 'asciidoctor';

export default (node: AbstractBlock, { content }: { content: string }) => {
	const lang = node.getAttribute('language');
	const title = node.getAttribute('title');

	const outputHtml = `
		<div
			class="listingblock"
			data-language="${lang}"
			x-data="{
				copied: false,
				clip() {
					const str = Array.from($refs.wrapper.querySelectorAll('span.line'))
						.filter(line => !(line.classList.contains('remove')))
						.map(line => Array.from(line.children)
							.filter(span => !(span.classList.contains('unselectable')))
							.map(span => span.textContent).join('')
						).join('\\n');

					navigator.clipboard.writeText(str).then(() => {
						this.copied = true;
						setTimeout(() => { this.copied = false }, 2500);
					});
				}
			}">
			<button
				class="copy-btn rotating-btn ${title ? 'mt-6' : ''}"
				:class="{ 'rotating-btn--active': copied }"
				:disabled="copied"
				@click="clip"
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
