'use client';

import { useState } from 'react';

export function Announcement({ text, closeLabel }: { text: string; closeLabel: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="announcement">
      <p>{text}</p>
      <button className="announcement-close" aria-label={closeLabel} onClick={() => setOpen(false)}>
        <i className="icon-x" aria-hidden="true" />
      </button>
    </div>
  );
}
