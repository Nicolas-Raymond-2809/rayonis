import { defineCollection, z } from 'astro:content';

const proCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		tags: z.array(z.string()),
	}),
});

const academyCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		tags: z.array(z.string()),
	}),
});

const blogCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.date(),
		tags: z.array(z.string()),
		image: z.string().optional(),
	}),
});

export const collections = {
	'pro': proCollection,
	'academy': academyCollection,
	'blog': blogCollection,
};
