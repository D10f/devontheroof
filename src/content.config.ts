import { defineCollection, z } from 'astro:content';
import { asciidocLoader } from '@d10f/asciidoc-astro-loader';
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';

const blog = defineCollection({
	loader: asciidocLoader({
		base: 'src/content/blog',
		document: {
			template: './src/templates',
		},
		syntaxHighlighting: {
			theme: 'catppuccin-frappe',
			transformers: [
				transformerNotationDiff(),
				transformerNotationErrorLevel(),
				transformerNotationFocus(),
				transformerNotationHighlight(),
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
