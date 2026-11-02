'use client';

import { useRef, useState } from 'react';
import { fill } from '@/i18n/fill';
import type { Messages } from '@/i18n/messages';

type Props = { images: string[]; label: string; t: Messages['rooms'] };

// The photos of one room, side by side in a strip that snaps to one photo at a time. It can be
// swiped without JavaScript; the arrows wrap around from the last photo to the first. Photos
// load lazily, so the hidden ones cost nothing until they come close.
export function RoomPhotos({ images, label, t }: Props) {
  const strip = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = images.length;

  function go(step: number) {
    const el = strip.current;
    if (!el) return;
    const next = (index + step + total) % total;
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  }

  return (
    <div className="room-photos">
      <div
        className="room-photos-strip"
        ref={strip}
        onScroll={event => {
          const el = event.currentTarget;
          if (el.clientWidth > 0) setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {images.map((src, i) => (
          <img src={src} alt={fill(t.photoAlt, { room: label, n: i + 1, total })} loading="lazy" key={src} />
        ))}
      </div>
      {total > 1 && (
        <>
          <button type="button" className="room-photos-arrow room-photos-prev" aria-label={t.photoPrev} onClick={() => go(-1)}>
            <i className="icon-chevron-left" aria-hidden="true" />
          </button>
          <button type="button" className="room-photos-arrow room-photos-next" aria-label={t.photoNext} onClick={() => go(1)}>
            <i className="icon-chevron-right" aria-hidden="true" />
          </button>
          <span className="room-photos-count" aria-hidden="true">{index + 1} / {total}</span>
        </>
      )}
    </div>
  );
}
