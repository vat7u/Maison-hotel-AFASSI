import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import 'lucide-static/font/lucide.css';
import '@/styles/ds/colors.css';
import '@/styles/ds/typography.css';
import '@/styles/ds/spacing.css';
import '@/styles/ds/effects.css';
import '@/styles/ds/base.css';
import '@/styles/fonts.css';
import '@/styles/tailwind.css';
import '@/styles/site.css';
import { BackToTop } from '@/components/BackToTop';
import { FadeObserver } from '@/components/FadeObserver';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { LOCALES, isLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { fontVariables } from '../fonts';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

type Props = { children: ReactNode; params: Promise<{ lang: string }> };

// .fade content starts hidden and FadeObserver reveals it, and "Voir plus" reveals the other
// rooms. Without JavaScript nothing would, so these rules show everything straight away.
const NO_SCRIPT_FADE =
  '.fade { opacity: 1; transform: none; } .room[hidden] { display: flex; } .rooms-more { display: none; }';

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={fontVariables}
      data-scroll-behavior="smooth"
    >
      <head>
        <noscript>
          <style>{NO_SCRIPT_FADE}</style>
        </noscript>
      </head>
      <body>
        <SiteHeader lang={lang} />
        {children}
        <SiteFooter lang={lang} />
        <BackToTop label={getMessages(lang).nav.backToTop} />
        <FadeObserver />
      </body>
    </html>
  );
}
