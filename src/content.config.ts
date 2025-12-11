import { defineCollection, z } from 'astro:content';
import { asciidocLoader } from '@d10f/asciidoc-astro-loader';
import {
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerNotationFocus,
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
				transformerNotationFocus(),
				transformerNotationHighlight(),
				transformerNotationDiff(),
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
