import Link from '@/components/SiteLink';
import type { PostSummary } from '@/lib/journal';

export function PostCard({ post, lang, readMore }: { post: PostSummary; lang: string; readMore: string }) {
  return (
    <article className="post-card fade">
      <Link href={`/${lang}/journal/${post.slug}/`} className="post-card-link">
        <div className="post-card-photo"><img src={post.image} alt={post.alt} loading="lazy" /></div>
        <p className="post-meta"><span lang="fr">{post.category}</span> · <time dateTime={post.date}>{post.dateText}</time></p>
        <h3 className="post-card-title" lang="fr">{post.title}</h3>
        <p className="post-card-excerpt" lang="fr">{post.excerpt}</p>
        <span className="read-more">{readMore}</span>
      </Link>
    </article>
  );
}
