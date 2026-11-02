'use client';

import Link from '@/components/SiteLink';
import { useEffect, useState } from 'react';
import type { Messages } from '@/i18n/messages';
import type { PostSummary } from '@/lib/journal';
import { PostCard } from './PostCard';

type Props = { posts: PostSummary[]; lang: string; t: Messages['journal'] };

// Category tabs, featured post and card grid. The chosen category stays in the address
// (?cat=Moto) so it can be linked to.
export function JournalList({ posts, lang, t }: Props) {
  const categories = [...new Set(posts.map(p => p.category))];
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('cat');
    if (cat && posts.some(p => p.category === cat)) setCurrent(cat);
  }, [posts]);

  function choose(category: string | null) {
    setCurrent(category);
    const search = category ? `?cat=${encodeURIComponent(category)}` : '';
    history.replaceState(null, '', `${location.pathname}${search}`);
  }

  const list = posts.filter(p => current === null || p.category === current);
  const [first, ...rest] = list;
  const featured = current === null ? first : undefined;
  const grid = featured ? rest : list;
  const postUrl = (post: PostSummary) => `/${lang}/journal/${post.slug}/`;

  return (
    <>
      <div className="tabs" role="tablist" aria-label={t.categoriesLabel}>
        <button type="button" role="tab" aria-selected={current === null} onClick={() => choose(null)}>
          {t.allCategories}
        </button>
        {categories.map(category => (
          <button
            type="button"
            role="tab"
            aria-selected={current === category}
            onClick={() => choose(category)}
            lang="fr"
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      {featured && (
        <article className="featured fade">
          <Link href={postUrl(featured)} className="featured-photo">
            <img src={featured.image} alt={featured.alt} />
          </Link>
          <div className="featured-body">
            <p className="post-meta">
              {t.featured} · <span lang="fr">{featured.category}</span> · <time dateTime={featured.date}>{featured.dateText}</time>
            </p>
            <h2 className="featured-title" lang="fr"><Link href={postUrl(featured)}>{featured.title}</Link></h2>
            <p className="featured-excerpt" lang="fr">{featured.excerpt}</p>
            <Link href={postUrl(featured)} className="btn btn-outline">{t.readMore}</Link>
          </div>
        </article>
      )}
      <div className="post-grid">
        {grid.map(post => <PostCard post={post} lang={lang} readMore={t.readMore} key={post.slug} />)}
      </div>
      {list.length === 0 && <p className="empty">{t.empty}</p>}
    </>
  );
}
