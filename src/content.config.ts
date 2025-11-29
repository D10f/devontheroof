import { defineCollection, z } from "astro:content";
import { asciidocLoader } from '@d10f/asciidoc-astro-loader';

const blog = defineCollection({
    loader: asciidocLoader({
        base: 'src/content/blog',
        syntaxHighlighting: {
            theme: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-frappe'
            }
        }
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        preamble: z.string().optional(),
        createdAt: z.coerce.date()
    })
});

export const collections = { blog };