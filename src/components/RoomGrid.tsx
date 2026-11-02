'use client';

import { useState } from 'react';
import type { Messages } from '@/i18n/messages';
import type { Room } from '@/content/rooms';
import { RoomBookLink } from './BookingContext';
import { RoomFacts } from './RoomFacts';
import { RoomPhotos } from './RoomPhotos';

// Shows the featured rooms; "Voir plus" reveals the others. Every room stays in the HTML,
// so search engines and visitors without JavaScript can still read them.
export function RoomGrid({ rooms, t }: { rooms: Room[]; t: Messages['rooms'] }) {
  const [open, setOpen] = useState(false);
  const hasMore = rooms.some(room => !room.featured);

  function toggle() {
    setOpen(!open);
    if (open) document.getElementById('chambres')?.scrollIntoView();
  }

  return (
    <>
      <div className="room-grid" id="room-grid">
        {rooms.map(room => (
          <article className="room fade" hidden={!room.featured && !open} key={room.id}>
            <div className="room-photo">
              <RoomPhotos images={room.images} label={room.label} t={t} />
              {room.badge && <span className="badge badge-gold">{room.badge}</span>}
            </div>
            <div className="room-body">
              <p className="room-kind">{room.kind}</p>
              <h3 className="room-name">{room.name}</h3>
              <RoomFacts room={room} t={t} />
              <div className="room-foot">
                <RoomBookLink roomId={room.id} label={t.cta} />
              </div>
            </div>
          </article>
        ))}
      </div>
      {hasMore && (
        <div className="rooms-more">
          <button
            type="button"
            className="btn btn-primary"
            aria-expanded={open}
            aria-controls="room-grid"
            onClick={toggle}
          >
            {open ? t.showLess : t.showMore}
          </button>
        </div>
      )}
    </>
  );
}
