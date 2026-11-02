'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { fill } from '@/i18n/fill';

export type HeroSlide = { src: string; alt: string; position: string };

type Props = {
  slides: HeroSlide[];
  dotsLabel: string;
  dotLabel: string;
  children: ReactNode;
};

// Crossfades every 6 s; pauses on hover and when the tab is hidden; does not advance on its
// own for visitors who ask for reduced motion.
export function HeroSlider({ slides, dotsLabel, dotLabel, children }: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const stop = useCallback(() => clearInterval(timer.current), []);
  const start = useCallback(() => {
    stop();
    if (slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000);
  }, [slides.length, stop]);

  useEffect(() => {
    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [start, stop]);

  return (
    <section className="hero" id="accueil" onMouseEnter={stop} onMouseLeave={start}>
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            className={`hero-slide${i === index ? ' is-active' : ''}`}
            src={slide.src}
            alt={slide.alt}
            style={{ objectPosition: slide.position }}
            loading={i === 0 ? undefined : 'lazy'}
          />
        ))}
      </div>
      {slides.length > 1 && (
        <div className="hero-dots" role="group" aria-label={dotsLabel}>
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={fill(dotLabel, { n: i + 1 })}
              aria-current={i === index}
              onClick={() => {
                setIndex(i);
                start();
              }}
            />
          ))}
        </div>
      )}
      {children}
    </section>
  );
}
