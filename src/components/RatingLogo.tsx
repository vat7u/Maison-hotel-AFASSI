'use client';

import { useState } from 'react';

// Logo on its white tile; the tile disappears if the image fails to load.
export function RatingLogo({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <span className="rating-logo">
      <img src={src} alt="" width={24} height={24} onError={() => setFailed(true)} />
    </span>
  );
}
