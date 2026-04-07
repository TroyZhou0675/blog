import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    views: z.number().default(0),
    excerpt: z.string().default(''),
    cover: z.string().optional(),
    pinned: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().default(''),
  }),
});

export const collections = { blog, notes };
