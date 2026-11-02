'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Stars } from './Stars';

export type StripReview = {
  id: string;
  lang: string;
  name: string;
  countryName: string;
  flag: string | null; // lowercase country code
  rating: number;
  scale: number;
  scoreText: string;
  rated: string;
  via: string;
  text: string;
};

type Props = {
  reviews: StripReview[];
  badge: string | null; // shown while the reviews are examples
  more: string;
  less: string;
};

function Flag({ code }: { code: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      className="review-flag"
      src={`https://flagcdn.com/20x15/${code}.png`}
      srcSet={`https://flagcdn.com/40x30/${code}.png 2x`}
      width={20}
      height={15}
      alt=""
      onError={() => setFailed(true)}
    />
  );
}

// Endless strip of review cards. "Read more" shows only
// on texts cut by the line clamp, works on every copy, and stops the strip while a card is
// open. Copies are hidden from screen readers and the keyboard. Still for reduced motion.
export function ReviewStrip({ reviews, badge, more, less }: Props) {
  const marquee = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState({ copies: 0, width: 0 });
  const [longIds, setLongIds] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const measure = () => {
      const cards = list.current?.querySelectorAll<HTMLElement>('.review-card') ?? [];
      const long = [...cards]
        .filter(card => {
          const text = card.querySelector('.review-text');
          return text && text.scrollHeight - text.clientHeight >= 2;
        })
        .map(card => card.dataset.id as string);
      setLongIds(long);
    };
    measure();
    document.fonts.ready.then(measure); // the text wraps differently once the font has loaded
  }, [reviews]);

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
  }, [reviews]);

  const toggle = (key: string) =>
    setOpenKeys(keys => (keys.includes(key) ? keys.filter(k => k !== key) : [...keys, key]));

  const card = (review: StripReview, copy: number) => {
    const key = `${copy}:${review.id}`;
    const open = openKeys.includes(key);
    return (
      <article
        className={`review-card${open ? ' is-open' : ''}`}
        lang={review.lang}
        data-id={review.id}
        key={review.id}
      >
        <header className="review-head">
          {review.flag && <Flag code={review.flag} />}
          <div className="review-who">
            <p className="review-name">{review.name}</p>
            <p className="review-country">{review.countryName}</p>
          </div>
          {badge && <span className="badge badge-sky review-badge">{badge}</span>}
        </header>
        <div className="review-rating">
          {review.scale === 5 ? (
            <Stars score={review.rating} scale={review.scale} />
          ) : (
            <span className="review-score" aria-hidden="true">
              {review.scoreText}<span>/{review.scale}</span>
            </span>
          )}
          <span className="sr-only">{review.rated}</span>
        </div>
        <p className="review-text">{review.text}</p>
        {longIds.includes(review.id) && (
          <button
            type="button"
            className="review-more"
            aria-expanded={open}
            tabIndex={copy > 0 ? -1 : undefined}
            onClick={() => toggle(key)}
          >
            {open ? less : more}
          </button>
        )}
        <p className="review-platform">{review.via}</p>
      </article>
    );
  };

  const running = loop.copies > 0;
  const style = running
    ? ({
        '--review-shift': `-${loop.width}px`,
        '--review-duration': `${loop.width / 30}s`,
      } as CSSProperties)
    : undefined;

  return (
    <div className="review-marquee" ref={marquee}>
      <div
        className={`review-track${running ? ' is-running' : ''}${openKeys.length ? ' is-paused' : ''}`}
        style={style}
      >
        <div className="review-list" ref={list}>{reviews.map(r => card(r, 0))}</div>
        {Array.from({ length: loop.copies }, (_, i) => (
          <div className="review-list" aria-hidden="true" key={i}>
            {reviews.map(r => card(r, i + 1))}
          </div>
        ))}
      </div>
    </div>
  );
}
