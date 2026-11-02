import Link from '@/components/SiteLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { INSTAGRAM_URL, TRIPADVISOR_URL } from '@/content/site';
import { LangSwitch } from './LangSwitch';
import { NavLinks } from './NavLinks';
import { TripadvisorIcon } from './TripadvisorIcon';

export function SiteHeader({ lang }: { lang: Locale }) {
  const t = getMessages(lang).nav;

  return (
    <header className="site-header">
      <div className="header-logo">
        <Link href={`/${lang}/`}>
          <img src="/brand/logo.png" alt={t.logoAlt} width={1305} height={558} />
        </Link>
      </div>
      <div className="nav-row">
        <NavLinks lang={lang} t={t} />
        <div className="nav-social">
          <a href={INSTAGRAM_URL} aria-label={t.instagramLabel} target="_blank" rel="noopener">
            <i className="icon-instagram" aria-hidden="true" />
          </a>
          <a href={TRIPADVISOR_URL} aria-label={t.tripadvisorLabel} target="_blank" rel="noopener">
            <TripadvisorIcon />
          </a>
        </div>
        <LangSwitch lang={lang} label={t.languageLabel} />
      </div>
    </header>
  );
}
