import Link from '@/components/SiteLink';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { EMAIL, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_LINK, TRIPADVISOR_URL } from '@/content/site';
import { CurrentYear } from './CurrentYear';
import { TripadvisorIcon } from './TripadvisorIcon';

export function SiteFooter({ lang }: { lang: Locale }) {
  const m = getMessages(lang);
  const t = m.footer;
  const home = `/${lang}/`;

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-grid">
        <div>
          <Link href={home} className="footer-logo">
            <img src="/brand/logo.png" alt={m.nav.logoAlt} width={1305} height={558} loading="lazy" />
          </Link>
        </div>
        <div>
          <h4>{t.hoursTitle}</h4>
          <p><b>{t.reception}</b>{t.separator}{t.receptionHours}</p>
          <p><b>{t.breakfast}</b>{t.separator}{t.breakfastHours}</p>
          <p><b>{t.checkIn}</b>{t.separator}{t.checkInHours}</p>
          <p><b>{t.checkOut}</b>{t.separator}{t.checkOutHours}</p>
        </div>
        <div>
          <h4>{t.linksTitle}</h4>
          <p><Link href={`${home}a-propos/`}>{m.nav.about}</Link></p>
          <p><Link href={`${home}#chambres`}>{m.nav.rooms}</Link></p>
          <p><Link href={`${home}journal/`}>{m.nav.journal}</Link></p>
          <p><Link href={`${home}#reserver`}>{m.nav.book}</Link></p>
        </div>
        <div>
          <h4>{t.findUsTitle}</h4>
          <p><a href={MAPS_URL} target="_blank" rel="noopener">{t.address}</a></p>
          <p><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></p>
          <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <div className="socials">
            <a href={TRIPADVISOR_URL} aria-label={m.nav.tripadvisorLabel} target="_blank" rel="noopener">
              <TripadvisorIcon />
            </a>
            <a href={INSTAGRAM_URL} aria-label={m.nav.instagramLabel} target="_blank" rel="noopener">
              <i className="icon-instagram" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="legal">
        <span>© <CurrentYear buildYear={new Date().getFullYear()} /> {m.meta.siteName}</span>
      </div>
    </footer>
  );
}
