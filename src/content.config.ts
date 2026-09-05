// Content collections. `work` = one case study per live demo; the file name is
// the demo slug from src/data/site.ts (the page joins the two by that id).
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(), // one plain-English sentence, also the page description
    period: z.string(),
    order: z.number(), // position in the /work/ list and prev/next links
    problem: z.string(), // what the app is for, in the customer's terms
    built: z.array(z.string()).min(3).max(6), // what I actually built, one line each
    tryIt: z.array(z.string()).length(3), // three things a visitor can do in the demo
    diagram: z.string().optional(), // src/assets/diagrams/<name>.svg; defaults to the slug
  }),
});

export const collections = { work };
