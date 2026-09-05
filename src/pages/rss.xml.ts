// RSS feed of the engineering notes (linked from <head> as application/rss+xml).
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { profile } from '../data/site';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return rss({
    title: `Engineering notes — ${profile.name}`,
    description: 'Short write-ups of things learned building and running six live demo applications.',
    site: context.site ?? profile.siteUrl,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: `/notes/${n.id}/`,
      categories: n.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
