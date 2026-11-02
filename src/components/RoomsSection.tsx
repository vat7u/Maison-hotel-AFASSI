import type { Messages } from '@/i18n/messages';
import type { Room } from '@/content/rooms';
import { RoomGrid } from './RoomGrid';

export function RoomsSection({ rooms, t }: { rooms: Room[]; t: Messages['rooms'] }) {
  return (
    <section className="rooms" id="chambres">
      <div className="container">
        <div className="heading heading-center fade">
          <p className="heading-eyebrow">{t.eyebrow}</p>
          <h2 className="heading-script">{t.title}</h2>
          <p className="heading-body">{t.body}</p>
        </div>
        <RoomGrid rooms={rooms} t={t} />
      </div>
    </section>
  );
}
