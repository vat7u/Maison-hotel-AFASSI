// Journal helpers. getPosts is the one loader for post data, so a CMS can replace
// content/posts.ts later without touching the pages.
import { LOCALE_INFO, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/fill';
import type { Messages } from '@/i18n/messages';
import { posts, type Post, type PostBlock } from '@/content/posts';

export type PostSummary = Omit<Post, 'body'> & { dateText: string };

// Posts exist in French only; every language shows them, and the pages mark them lang="fr".
export function getPosts(_lang: Locale): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string, lang: Locale): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString(LOCALE_INFO[lang].intl, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function toSummary({ body: _body, ...post }: Post, lang: Locale): PostSummary {
  return { ...post, dateText: formatDate(post.date, lang) };
}

function blockText(block: PostBlock): string {
  if ('p' in block) return block.p;
  if ('h' in block) return block.h;
  if ('quote' in block) return block.quote;
  return block.list.join(' ');
}

export function readingTime(post: Post, m: Messages): string {
  const words = post.body.map(blockText).join(' ').split(/\s+/).length;
  return fill(m.journal.readingTime, { n: Math.max(1, Math.round(words / 200)) });
}
