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
			theme: {
				light: 'catppuccin-latte',
				dark: 'catppuccin-frappe',
			},
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
			callouts: {
				cssClasses: 'conum unselectable',
			},
		},
	}),
	schema: z
		.object({
			doctitle: z.string(),
			description: z.string(),
			revdate: z.coerce.date(),
			keywords: z.string().transform((t) => t.split(', ')),
			technologies: z.string().transform((t) => t.split(' ')),
		})
		.transform(({ doctitle, revdate, ...rest }) => ({
			title: doctitle,
			createdAt: revdate,
			...rest,
		})),
});

export const collections = { blog };
