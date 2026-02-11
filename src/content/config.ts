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
		category: z.string().optional(),
		image: z.string().optional(),
	}),
});

const radioCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		link: z.string(),
		source: z.string().optional(),
		category: z.string().optional(),
		score: z.number().optional(),
		emoji: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = {
	'pro': proCollection,
	'academy': academyCollection,
	'blog': blogCollection,
	'radio': radioCollection,
};
