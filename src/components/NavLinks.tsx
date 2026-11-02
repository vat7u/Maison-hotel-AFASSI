'use client';

import Link from '@/components/SiteLink';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Messages } from '@/i18n/messages';

const SECTIONS = ['accueil', 'chambres', 'avis', 'reserver'];

// The menu. On the home page the active link follows the section in view.
export function NavLinks({ lang, t }: { lang: string; t: Messages['nav'] }) {
  const pathname = usePathname().replace(/\/$/, '');
  const onHome = pathname === `/${lang}`;
  const onAbout = pathname.startsWith(`/${lang}/a-propos`);
  const onJournal = pathname.startsWith(`/${lang}/journal`);
  const [section, setSection] = useState('accueil');

  useEffect(() => {
    if (!onHome) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setSection(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);

  const home = `/${lang}/`;
  const item = (id: string, label: string) => (
    <Link href={`${home}#${id}`} className={onHome && section === id ? 'active' : undefined}>
      {label}
    </Link>
  );

  return (
    <nav className="site-nav" aria-label={t.label}>
      <Link href={home} className={onHome && section === 'accueil' ? 'active' : undefined}>
        {t.home}
      </Link>
      <Link
        href={`${home}a-propos/`}
        className={onAbout ? 'active' : undefined}
        aria-current={onAbout ? 'page' : undefined}
      >
        {t.about}
      </Link>
      {item('chambres', t.rooms)}
      {item('avis', t.reviews)}
      <Link
        href={`${home}journal/`}
        className={onJournal ? 'active' : undefined}
        aria-current={onJournal ? 'page' : undefined}
      >
        {t.journal}
      </Link>
      {item('reserver', t.book)}
      <a href="#contact">{t.contact}</a>
    </nav>
  );
}
