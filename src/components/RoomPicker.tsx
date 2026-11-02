'use client';

import { ChevronDownIcon, MinusIcon, PlusIcon } from 'lucide-react';
import type { Room } from '@/content/rooms';
import type { Locale } from '@/i18n/config';
import { fill } from '@/i18n/fill';
import { joinList } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useBooking, type Chosen } from './BookingContext';

// "2 × Double Deluxe", or just the name for one room.
export function chosenNames(chosen: Chosen, rooms: Room[]) {
  return rooms
    .map(room => ({ room, count: chosen.find(item => item.id === room.id)?.count ?? 0 }))
    .filter(({ count }) => count > 0)
    .map(({ room, count }) => (count > 1 ? `${count} × ${room.name}` : room.name));
}

type Props = { id: string; rooms: Room[]; lang: Locale; t: Messages['booking'] };

// Dropdown with one row per room type: how many rooms of that type the house has, and a
// counter from 0 to that number. It stays open while choosing, and the last chosen room cannot
// be removed. The hidden inputs carry one "room" value per room for when the form sends real
// requests.
export function RoomPicker({ id, rooms, lang, t }: Props) {
  const { chosen, setCount } = useBooking();
  const total = chosen.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      {chosen.flatMap(item => Array.from({ length: item.count }, (_, i) => (
        <input type="hidden" name="room" value={item.id} key={`${item.id}-${i}`} />
      )))}
      <Popover>
        <PopoverTrigger asChild>
          <Button id={id} variant="outline" className="booking-control justify-between">
            <span className="truncate">{joinList(chosenNames(chosen, rooms), lang)}</span>
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="room-counts w-(--radix-popover-trigger-width)">
          <ul>
            {rooms.map(room => {
              const count = chosen.find(item => item.id === room.id)?.count ?? 0;
              const values = { n: room.count, room: room.label };
              return (
                <li className="room-count" key={room.id}>
                  <div className="room-count-text">
                    <span className="room-count-name">{room.label}</span>
                    <span className="room-count-stock">
                      {fill(room.count > 1 ? t.typeCountMany : t.typeCountOne, values)}
                    </span>
                  </div>
                  <div className="room-count-stepper">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label={fill(t.fewer, values)}
                      disabled={count === 0 || total === 1}
                      onClick={() => setCount(room.id, count - 1, room.count)}
                    >
                      <MinusIcon />
                    </Button>
                    <output aria-live="polite" aria-label={room.label}>{count}</output>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label={fill(t.more, values)}
                      disabled={count >= room.count}
                      onClick={() => setCount(room.id, count + 1, room.count)}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
}
