import type { CustomConverterFactoryFn } from '@d10f/asciidoc-astro-loader';

export const xrefConverter: CustomConverterFactoryFn<object> = () => {
	return (options, highlighter, docs) => {
		return {
			nodeContext: 'inline_anchor',
			convert(node) {
				const refId = node.getAttribute('refid');
				const fragment = node.getAttribute('fragment');
				if (!refId) return null;

				const doc = docs.find((doc) => refId.startsWith(doc.filename));
				if (!doc) return null;

				const href = fragment ? doc.slug + `#${fragment}` : doc.slug;

				return `<a href=${href}>${node.getReftext()}</a>`;
			},
		};
	};
};
