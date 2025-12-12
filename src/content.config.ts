import { defineCollection, z } from 'astro:content';
import { asciidocLoader, transformerPrompt } from '@d10f/asciidoc-astro-loader';
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { admonitionConverter } from './converters/admonitionConverter';

const blog = defineCollection({
	loader: asciidocLoader({
		base: 'src/content/blog',
		document: {
			template: './src/templates',
			converters: [admonitionConverter()],
		},
		syntaxHighlighting: {
			theme: 'catppuccin-frappe',
			transformers: [
				transformerNotationDiff(),
				transformerNotationErrorLevel(),
				transformerNotationFocus(),
				transformerNotationHighlight(),
				transformerPrompt({
					langs: {
						console: '$',
					},
					cssClasses: 'unselectable mr-2 opacity-50',
				}),
			],
		},
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		preamble: z.string().optional(),
		createdAt: z.coerce.date(),
	}),
});

export const collections = { blog };
