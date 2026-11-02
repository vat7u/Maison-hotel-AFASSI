import type { CSSProperties } from 'react';

const PER_SET = 7; // the layout in site.css places exactly 7 photos per set

type Photo = { src: string; alt: string };

// Endless strip of photo collages, sliding left to right. The photos are cut into sets of 7,
// and the strip repeats the whole group of sets. CSS does the movement and the sizes, so no
// JavaScript reaches the browser. Copies are hidden from screen readers. Stays still for
// reduced motion.
export function GallerySlider({ photos }: { photos: Photo[] }) {
  if (photos.length === 0 || photos.length % PER_SET !== 0) {
    throw new Error(`GallerySlider needs a multiple of ${PER_SET} photos, got ${photos.length}`);
  }
  const sets = Array.from({ length: photos.length / PER_SET }, (_, i) => photos.slice(i * PER_SET, (i + 1) * PER_SET));
  const copies = Math.max(2, Math.ceil(4 / sets.length)); // enough to fill the widest screens

  return (
    <div className="gallery-marquee" style={{ '--gallery-sets': sets.length } as CSSProperties}>
      <div className="gallery-track">
        {Array.from({ length: copies }, (_, copy) => (
          <div className="gallery-group" aria-hidden={copy > 0 ? 'true' : undefined} key={copy}>
            {sets.map((set, i) => (
              <div className="gallery-set" key={i}>
                {set.map(photo => (
                  <img src={photo.src} alt={copy > 0 ? '' : photo.alt} loading="lazy" key={photo.src} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
