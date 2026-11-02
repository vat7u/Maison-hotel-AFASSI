import type { Metadata } from 'next';
import Link from '@/components/SiteLink';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import type { PostBlock } from '@/content/posts';
import { LOCALES, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { formatDate, getPosts, readingTime, toSummary } from '@/lib/journal';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap(lang => getPosts(lang).map(post => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPosts(lang).find(p => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    lang,
    path: `/journal/${slug}/`,
    title: `${post.title} — ${getMessages(lang).meta.articleTitleSuffix}`,
    description: post.excerpt,
    image: post.image,
    frenchContent: true,
  });
}

function Block({ block }: { block: PostBlock }) {
  if ('h' in block) return <h2>{block.h}</h2>;
  if ('quote' in block) return <blockquote>{block.quote}</blockquote>;
  if ('list' in block) return <ul>{block.list.map(item => <li key={item}>{item}</li>)}</ul>;
  return <p>{block.p}</p>;
}

export default async function ArticlePage({ params }: Props) {
  const { lang, slug } = await params;
  const posts = getPosts(lang);
  const post = posts.find(p => p.slug === slug);
  if (!post) notFound();

  const m = getMessages(lang);
  const t = m.journal;
  const others = posts.filter(p => p !== post).slice(0, 3).map(p => toSummary(p, lang));

  return (
    <>
      <main>
        <article className="article">
          <header className="article-head fade">
            <Link href={`/${lang}/journal/`} className="back-link">
              <i className="icon-arrow-left" aria-hidden="true" />{t.back}
            </Link>
            <p className="post-meta">
              <Link href={`/${lang}/journal/?cat=${encodeURIComponent(post.category)}`} lang="fr">{post.category}</Link>
              {' · '}<time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              {' · '}{readingTime(post, m)}
            </p>
            <h1 className="af-display article-title" lang="fr">{post.title}</h1>
            <p className="article-lead" lang="fr">{post.excerpt}</p>
          </header>
          <figure className="article-photo fade"><img src={post.image} alt={post.alt} /></figure>
          <div className="article-body fade" lang="fr">
            {post.body.map((block, i) => <Block block={block} key={i} />)}
          </div>
        </article>
        {others.length > 0 && (
          <section className="related">
            <div className="container">
              <div className="heading heading-center">
                <p className="heading-eyebrow">{t.relatedEyebrow}</p>
                <h2 className="heading-script">{t.relatedTitle}</h2>
              </div>
              <div className="post-grid">
                {others.map(p => <PostCard post={p} lang={lang} readMore={t.readMore} key={p.slug} />)}
              </div>
            </div>
          </section>
        )}
      </main>

      <section className="features cta-band">
        <div className="heading heading-center heading-inverse">
          <p className="heading-eyebrow">{t.ctaEyebrow}</p>
          <h2 className="heading-script">{t.ctaTitle}</h2>
        </div>
        <Link href={`/${lang}/#reserver`} className="btn btn-inverse btn-wide">{t.ctaButton}</Link>
      </section>
    </>
  );
}
