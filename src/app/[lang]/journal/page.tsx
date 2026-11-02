import type { Metadata } from 'next';
import { JournalList } from '@/components/JournalList';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { getPosts, toSummary } from '@/lib/journal';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getMessages(lang);
  return pageMetadata({
    lang,
    path: '/journal/',
    title: meta.journalTitle,
    description: meta.journalDescription,
    image: getPosts(lang)[0].image,
    frenchContent: true,
  });
}

export default async function JournalPage({ params }: Props) {
  const { lang } = await params;
  const t = getMessages(lang).journal;
  const posts = getPosts(lang).map(post => toSummary(post, lang));

  return (
    <main>
      <section className="page-hero">
        <p className="af-label hero-eyebrow">{t.eyebrow}</p>
        <h1>
          <span className="af-display page-hero-caps">{t.pageCaps}</span>
          <span className="af-script page-hero-script">{t.pageScript}</span>
        </h1>
        <p className="page-hero-text">{t.pageBody}</p>
      </section>

      <section className="journal">
        <div className="container">
          <JournalList posts={posts} lang={lang} t={t} />
        </div>
      </section>
    </main>
  );
}
