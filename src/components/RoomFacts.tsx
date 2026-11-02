import { fill } from '@/i18n/fill';
import type { Messages } from '@/i18n/messages';
import type { Room } from '@/content/rooms';

// The same for every room. Labels are in messages/<lang>.json under rooms.amenities.
const AMENITIES = [
  { key: 'airConditioning', icon: 'icon-snowflake' },
  { key: 'shower', icon: 'icon-shower-head' },
  { key: 'tv', icon: 'icon-tv' },
  { key: 'wifi', icon: 'icon-wifi' },
] as const;

// Capacity, amenity tags, beds with their icons, and the optional sentence. Used by the room
// cards and the booking summary, so both always show the same details.
export function RoomFacts({ room, t }: { room: Room; t: Messages['rooms'] }) {
  const { double, single, sofa } = room.beds;
  const beds = [
    { n: double, one: t.beds.double, many: t.beds.doubles, icon: 'icon-bed-double' },
    { n: single, one: t.beds.single, many: t.beds.singles, icon: 'icon-bed-single' },
    { n: sofa, one: t.beds.sofa, many: t.beds.sofas, icon: 'icon-sofa' },
  ].filter(item => item.n);

  return (
    <>
      <p className="room-details">{room.details}</p>
      <ul className="tags room-amenities">
        {AMENITIES.map(({ key, icon }) => (
          <li className="tag" key={key}>
            <i className={icon} aria-hidden="true" />{t.amenities[key]}
          </li>
        ))}
      </ul>
      <ul className="room-beds">
        {beds.map(item => (
          <li key={item.icon}>
            <span>{fill(item.n === 1 ? item.one : item.many, { n: item.n as number })}</span>
            <i className={item.icon} aria-hidden="true" />
          </li>
        ))}
      </ul>
      {room.desc && <p className="room-desc">{room.desc}</p>}
    </>
  );
}
