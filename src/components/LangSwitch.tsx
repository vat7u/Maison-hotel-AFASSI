'use client';

import Link from '@/components/SiteLink';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_INFO, type Locale } from '@/i18n/config';

type Props = {
  lang: Locale;
  label: string;
};

// Language buttons: real links to the same page in another language. The address is the
// only source of the language. Each link names its language in that language.
export function LangSwitch({ lang, label }: Props) {
  const pathname = usePathname();

  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {LOCALES.map(locale => (
        <Link
          key={locale}
          href={pathname.replace(/^\/[^/]+/, `/${locale}`)}
          scroll={false}
          lang={locale}
          hrefLang={locale}
          aria-label={LOCALE_INFO[locale].name}
          aria-current={locale === lang ? 'true' : undefined}
        >
          {LOCALE_INFO[locale].label}
        </Link>
      ))}
    </div>
  );
}
