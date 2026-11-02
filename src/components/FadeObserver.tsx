'use client';

import { useEffect } from 'react';

// Gentle fade-in on scroll. Elements with .fade stay hidden until they get .in (site.css).
// A MutationObserver picks up content added after load and after moving between pages, so
// nothing can stay invisible.
export function FadeObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    const scan = () => document.querySelectorAll('.fade:not(.in)').forEach(el => io.observe(el));
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
