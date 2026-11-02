'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { partners } from '@/content/partners';

// Endless logo strip. Copies of the list fill the band; the track slides by exactly one list
// width, then restarts, so the jump is invisible. Stays still for reduced motion.
export function PartnerSlider() {
  const marquee = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [loop, setLoop] = useState({ copies: 0, width: 0 });

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const measure = () => {
      const width = list.current?.getBoundingClientRect().width ?? 0;
      if (!width || !marquee.current) return;
      setLoop({ copies: Math.ceil(marquee.current.clientWidth / width) + 1, width });
    };
    measure();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 200);
    };
    addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      removeEventListener('resize', onResize);
    };
  }, []);

  const running = loop.copies > 0;
  const style = running
    ? ({ '--partner-shift': `-${loop.width}px`, '--partner-duration': `${loop.width / 40}s` } as CSSProperties)
    : undefined;

  const items = (decorative: boolean) =>
    partners.map(p => (
      <li className="partner" key={p.src}>
        <img src={p.src} alt={decorative ? '' : p.alt} width={p.width} height={p.height} />
      </li>
    ));

  return (
    <div className="partner-marquee" ref={marquee}>
      <div className={`partner-track${running ? ' is-running' : ''}`} style={style}>
        <ul className="partner-list" ref={list}>{items(false)}</ul>
        {Array.from({ length: loop.copies }, (_, i) => (
          <ul className="partner-list" aria-hidden="true" key={i}>{items(true)}</ul>
        ))}
      </div>
    </div>
  );
}
