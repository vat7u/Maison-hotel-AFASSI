import type { Metadata } from 'next';
import { LOCALES, LOCALE_INFO, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { ALLOW_INDEXING, SITE_URL } from '@/content/site';

type PageInfo = {
  lang: Locale;
  path: string; // after the language, e.g. '/journal/'
  title: string;
  description: string;
  image: string;
  // The page's content is French in every language (the journal): its canonical address is
  // the French one, and it has no alternate languages.
  frenchContent?: boolean;
};

export function pageMetadata({ lang, path, title, description, image, frenchContent }: PageInfo): Metadata {
  const home: Locale = frenchContent ? 'fr' : lang;
  const languages = Object.fromEntries(LOCALES.map(l => [l, `/${l}${path}`]));
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
    icons: { icon: '/brand/logo-mark.png' },
    alternates: {
      canonical: `/${home}${path}`,
      ...(frenchContent ? {} : { languages: { ...languages, 'x-default': `/fr${path}` } }),
    },
    openGraph: {
      title,
      description,
      url: `/${home}${path}`,
      siteName: getMessages(lang).meta.siteName,
      locale: LOCALE_INFO[home].og,
      type: 'website',
      images: [image],
    },
  };
}
