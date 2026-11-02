'use client';

import { addDays, startOfToday } from 'date-fns';
import { useRef, useState, type FormEvent } from 'react';
import type { Messages } from '@/i18n/messages';
import type { Room } from '@/content/rooms';
import type { Locale } from '@/i18n/config';
import { joinList } from '@/i18n/format';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBooking } from './BookingContext';
import { DatePicker } from './DatePicker';
import { RoomFacts } from './RoomFacts';
import { RoomPicker, chosenNames } from './RoomPicker';

type Props = { lang: Locale; rooms: Room[]; t: Messages['booking']; roomText: Messages['rooms'] };

// Booking request form. There is no backend yet: submitting only shows the confirmation
// dialog and resets the form. It must send real requests before the site goes public.
export function BookingSection({ lang, rooms, t, roomText }: Props) {
  const { chosen, resetRooms } = useBooking();
  const dialog = useRef<HTMLDialogElement>(null);
  const [arrival, setArrival] = useState<Date>();
  const [departure, setDeparture] = useState<Date>();
  const [showErrors, setShowErrors] = useState(false);
  const [guests, setGuests] = useState(2);
  const [requested, setRequested] = useState({ names: [rooms[0].name], total: 1 });
  // The guest list ends at what the chosen rooms hold; a larger earlier choice is cut down to it.
  const maxGuests = chosen.reduce((sum, item) => sum + item.count * (rooms.find(r => r.id === item.id)?.maxGuests ?? 0), 0);
  const shownGuests = Math.min(guests, maxGuests);
  const room = rooms.find(r => r.id === chosen.at(-1)?.id) ?? rooms[0];
  // The sentence holds {rooms} once, and the room list goes there in bold. The plural sentence
  // is for more than one room, even of a single type ("2 × Double Deluxe").
  const [before, after = ''] = (requested.total > 1 ? t.dialogMany : t.dialogOne).split('{rooms}');

  function chooseArrival(date: Date | undefined) {
    setArrival(date);
    if (date && departure && departure <= date) setDeparture(undefined);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!arrival || !departure) {
      setShowErrors(true);
      return;
    }
    setRequested({ names: chosenNames(chosen, rooms), total: chosen.reduce((sum, item) => sum + item.count, 0) });
    dialog.current?.showModal();
    event.currentTarget.reset();
    setArrival(undefined);
    setDeparture(undefined);
    setShowErrors(false);
    setGuests(2);
    resetRooms();
  }

  return (
    <section className="booking" id="reserver">
      <div className="container booking-grid">
        <div className="fade">
          <div className="heading">
            <p className="heading-eyebrow">{t.eyebrow}</p>
            <h2 className="heading-script">{t.title}</h2>
            <p className="heading-body">{t.body}</p>
          </div>
          <form onSubmit={onSubmit}>
            <FieldGroup className="booking-form">
              <Field className="field-full">
                <FieldLabel htmlFor="booking-room">{t.room}</FieldLabel>
                <RoomPicker id="booking-room" rooms={rooms} lang={lang} t={t} />
                <FieldDescription>{t.roomHint}</FieldDescription>
              </Field>
              <Field data-invalid={(showErrors && !arrival) || undefined}>
                <FieldLabel htmlFor="booking-arrival">{t.arrival}</FieldLabel>
                <DatePicker
                  lang={lang}
                  id="booking-arrival"
                  name="arrival"
                  value={arrival}
                  onChange={chooseArrival}
                  firstDay={startOfToday()}
                  placeholder={t.datePlaceholder}
                  invalid={showErrors && !arrival}
                />
                {showErrors && !arrival
                  ? <FieldError>{t.dateRequired}</FieldError>
                  : <FieldDescription>{t.arrivalHint}</FieldDescription>}
              </Field>
              <Field data-invalid={(showErrors && !departure) || undefined}>
                <FieldLabel htmlFor="booking-departure">{t.departure}</FieldLabel>
                <DatePicker
                  lang={lang}
                  id="booking-departure"
                  name="departure"
                  value={departure}
                  onChange={setDeparture}
                  firstDay={addDays(arrival ?? startOfToday(), 1)}
                  placeholder={t.datePlaceholder}
                  invalid={showErrors && !departure}
                />
                {showErrors && !departure
                  ? <FieldError>{t.dateRequired}</FieldError>
                  : <FieldDescription>{t.departureHint}</FieldDescription>}
              </Field>
              <Field>
                <FieldLabel htmlFor="booking-guests">{t.guests}</FieldLabel>
                <Select name="guests" value={String(shownGuests)} onValueChange={value => setGuests(Number(value))}>
                  <SelectTrigger id="booking-guests">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      {Array.from({ length: maxGuests }, (_, i) => String(i + 1)).map(count => <SelectItem value={count} key={count}>{count}</SelectItem>)}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="booking-name">{t.name}</FieldLabel>
                <Input id="booking-name" name="name" placeholder={t.namePlaceholder} autoComplete="name" required />
              </Field>
              <Field className="field-full">
                <FieldLabel htmlFor="booking-email">{t.email}</FieldLabel>
                <Input id="booking-email" type="email" name="email" placeholder={t.emailPlaceholder} autoComplete="email" required />
              </Field>
              <Field className="field-full">
                <FieldLabel htmlFor="booking-message">{t.message}</FieldLabel>
                <Textarea id="booking-message" name="message" rows={3} placeholder={t.messagePlaceholder} />
              </Field>
              <div className="field-full">
                <button type="submit" className="btn btn-primary btn-lg">{t.submit}</button>
              </div>
            </FieldGroup>
          </form>
        </div>
        <aside className="booking-aside fade">
          <div className="room-photo"><img src={room.images[0]} alt="" loading="lazy" /></div>
          <div className="room-body">
            <p className="room-kind">{room.kind}</p>
            <p className="room-name">{room.name}</p>
            <RoomFacts room={room} t={roomText} />
          </div>
        </aside>
      </div>
      <dialog className="dialog" ref={dialog} aria-labelledby="dialog-title">
        <p className="heading-eyebrow">{t.dialogEyebrow}</p>
        <h2 className="dialog-title" id="dialog-title">{t.dialogTitle}</h2>
        <p>
          {before}<b>{joinList(requested.names, lang)}</b>{after}
        </p>
        <form method="dialog" className="dialog-foot">
          <button className="btn btn-primary btn-sm">{t.dialogClose}</button>
        </form>
      </dialog>
    </section>
  );
}
