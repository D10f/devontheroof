import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { asciidocLoader, transformerPrompt } from '@d10f/asciidoc-astro-loader';
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { admonitionConverter } from './converters/admonitionConverter';
import { xrefConverter } from './converters/xrefConverter';

const blog = defineCollection({
	loader: asciidocLoader({
		base: 'src/content/blog',
		images: {
			imageUrl: '/',
		},
		document: {
			template: './src/templates',
			converters: [admonitionConverter(), xrefConverter()],
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
						prolog: {
							hideBreak: true,
						},
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

const series = defineCollection({
	loader: asciidocLoader({
		base: './src/content/series',
		images: {
			imageUrl: '/',
		},
		document: {
			template: './src/templates',
			converters: [admonitionConverter(), xrefConverter()],
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
						prolog: {
							hideBreak: true,
						},
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
			series: z.string(),
			'series-prev': z.string().optional(),
			'series-next': z.string().optional(),
			'series-description': z.string().optional(),
		})
		.transform(({ doctitle, revdate, ...rest }) => ({
			title: doctitle,
			createdAt: revdate,
			...rest,
		})),
});

export const collections = { blog, series };
