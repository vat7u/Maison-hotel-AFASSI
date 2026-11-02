'use client';

import { useEffect, useState } from 'react';

const SHOW_AFTER = 400; // pixels scrolled before the button appears

// Round button, bottom right, that returns to the top of the page. The smooth scroll comes
// from the CSS on <html>, which already turns off for visitors who ask for reduced motion.
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label={label}
      title={label}
      tabIndex={visible ? undefined : -1}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <i className="icon-arrow-up" aria-hidden="true" />
    </button>
  );
}
