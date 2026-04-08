import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = await getCollection('notes');
  const blog = await getCollection('blog');

  const allItems = [
    ...notes.map(note => ({
      title: note.data.title,
      pubDate: note.data.date ? new Date(note.data.date) : new Date(),
      description: note.data.excerpt || '',
      link: `/notes/${note.slug}/`,
      customData: `<category>${note.data.category || '笔记'}</category>`,
    })),
    ...blog.map(post => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: `/blog/${post.slug}/`,
      customData: `<category>${post.data.category || '博客'}</category>`,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "TroyZhou's Page",
    description: '分享知识，结识志同道合的朋友',
    site: context.site,
    items: allItems,
    customData: `<language>zh-cn</language>`,
    stylesheet: false,
  });
}
