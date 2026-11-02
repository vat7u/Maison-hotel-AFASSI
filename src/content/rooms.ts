/*
  ROOMS — the one place to change a room. The home page cards, the booking form and
  its summary card all read from this list. Facts come from room_inventory_recreated.md.

    id        short key, lowercase, never shown
    count     how many rooms of this type the house has (13 in all); the booking form lets a
              guest ask for up to this many
    maxGuests most guests one room of this type takes (the top of its "details" range); the
              booking form offers 1 up to the total over the rooms chosen
    featured  true for the rooms shown first; the others appear after "show more".
              Keep the featured rooms at the top of the list.
    beds      how many double beds, single beds and sofas the room has; each shows
              with its icon. Leave out any the room does not have.
    images    the room's photos, in display order: the first is the cover, shown on the card
              and in the booking summary; the bathroom comes last. roomPhotos(id, count)
              lists public/images/rooms/<id>/01.webp to <count>.webp. The originals are in
              photograph/JPEG at the repository root; resize new ones to WebP, 1200 px wide.
    text      the wording in every language (fr, en, es, de); a missing one fails the build.
                name      room type, shown large on the card and in the booking confirmation.
                          In German it must be a "-zimmer" noun, because the confirmation
                          sentence puts "das" or "die" before it
                label     the full phrase, used in the room list of the booking form
                kind      word shown above the name
                details   capacity and size
                desc      optional sentence, for what the icons cannot say
                badge     optional small label on the photo

  The amenity icons (air conditioning, shower, TV, Wi-Fi) are the same for every room:
  they are set in src/components/RoomFacts.tsx. No prices are shown on the site: each room
  has an "ask for your price" button instead.
*/
import type { Locale } from '@/i18n/config';

export type RoomBeds = { double?: number; single?: number; sofa?: number };

type RoomText = { name: string; label: string; kind: string; details: string; desc?: string; badge?: string };

type RoomEntry = {
  id: string;
  count: number;
  maxGuests: number;
  featured: boolean;
  beds: RoomBeds;
  images: string[];
  text: Record<Locale, RoomText>;
};

export type Room = Omit<RoomEntry, 'text'> & RoomText;

// The photos of a room are public/images/rooms/<id>/01.webp, 02.webp, ... in display order.
const roomPhotos = (id: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/images/rooms/${id}/${String(i + 1).padStart(2, '0')}.webp`);

const rooms: RoomEntry[] = [
  {
    id: 'deluxe-double',
    maxGuests: 2,
    count: 4,
    featured: true,
    beds: { double: 1, sofa: 2 },
    images: roomPhotos('deluxe-double', 17),
    text: {
      fr: {
        name: 'Double Deluxe',
        label: 'Chambre Double Deluxe',
        kind: 'Chambre',
        details: '1–2 pers.  ·  40 m²',
        desc: 'Avec un salon séparé.',
      },
      en: {
        name: 'Deluxe Double',
        label: 'Deluxe Double Room',
        kind: 'Room',
        details: '1–2 guests  ·  40 m²',
        desc: 'With a separate living room.',
      },
      es: {
        name: 'Doble Deluxe',
        label: 'Habitación Doble Deluxe',
        kind: 'Habitación',
        details: '1–2 pers.  ·  40 m²',
        desc: 'Con salón independiente.',
      },
      de: {
        name: 'Deluxe-Doppelzimmer',
        label: 'Deluxe-Doppelzimmer',
        kind: 'Zimmer',
        details: '1–2 Pers.  ·  40 m²',
        desc: 'Mit separatem Wohnbereich.',
      },
    },
  },
  {
    id: 'family',
    maxGuests: 6,
    count: 1,
    featured: true,
    beds: { double: 2, single: 2, sofa: 2 },
    images: roomPhotos('family', 8),
    text: {
      fr: {
        name: 'Familiale',
        label: 'Chambre Familiale',
        kind: 'Chambre',
        details: '3–6 pers.  ·  60 m²',
        desc: 'Trois chambres séparées et un salon.',
      },
      en: {
        name: 'Family',
        label: 'Family Room',
        kind: 'Room',
        details: '3–6 guests  ·  60 m²',
        desc: 'Three separate bedrooms and a living room.',
      },
      es: {
        name: 'Familiar',
        label: 'Habitación Familiar',
        kind: 'Habitación',
        details: '3–6 pers.  ·  60 m²',
        desc: 'Tres dormitorios independientes y un salón.',
      },
      de: {
        name: 'Familienzimmer',
        label: 'Familienzimmer',
        kind: 'Zimmer',
        details: '3–6 Pers.  ·  60 m²',
        desc: 'Drei getrennte Schlafzimmer und ein Wohnzimmer.',
      },
    },
  },
  {
    id: 'standard',
    maxGuests: 3,
    count: 2,
    featured: true,
    beds: { double: 1, single: 1 },
    images: roomPhotos('standard', 6),
    text: {
      fr: {
        name: 'Standard',
        label: 'Chambre Standard',
        kind: 'Chambre',
        details: '1–3 pers.  ·  15 m²',
      },
      en: {
        name: 'Standard',
        label: 'Standard Room',
        kind: 'Room',
        details: '1–3 guests  ·  15 m²',
      },
      es: {
        name: 'Estándar',
        label: 'Habitación Estándar',
        kind: 'Habitación',
        details: '1–3 pers.  ·  15 m²',
      },
      de: {
        name: 'Standardzimmer',
        label: 'Standardzimmer',
        kind: 'Zimmer',
        details: '1–3 Pers.  ·  15 m²',
      },
    },
  },
  {
    id: 'quadruple',
    maxGuests: 4,
    count: 1,
    featured: false,
    beds: { double: 1, single: 2 },
    images: roomPhotos('quadruple', 7),
    text: {
      fr: {
        name: 'Quadruple',
        label: 'Chambre Quadruple',
        kind: 'Chambre',
        details: '3–4 pers.  ·  25 m²',
      },
      en: {
        name: 'Quadruple',
        label: 'Quadruple Room',
        kind: 'Room',
        details: '3–4 guests  ·  25 m²',
      },
      es: {
        name: 'Cuádruple',
        label: 'Habitación Cuádruple',
        kind: 'Habitación',
        details: '3–4 pers.  ·  25 m²',
      },
      de: {
        name: 'Vierbettzimmer',
        label: 'Vierbettzimmer',
        kind: 'Zimmer',
        details: '3–4 Pers.  ·  25 m²',
      },
    },
  },
  {
    id: 'triple',
    maxGuests: 4,
    count: 2,
    featured: false,
    beds: { double: 2 },
    images: roomPhotos('triple', 7),
    text: {
      fr: {
        name: 'Triple',
        label: 'Chambre Triple',
        kind: 'Chambre',
        details: '2–4 pers.  ·  20 m²',
        desc: 'Deux chambres séparées.',
      },
      en: {
        name: 'Triple',
        label: 'Triple Room',
        kind: 'Room',
        details: '2–4 guests  ·  20 m²',
        desc: 'Two separate bedrooms.',
      },
      es: {
        name: 'Triple',
        label: 'Habitación Triple',
        kind: 'Habitación',
        details: '2–4 pers.  ·  20 m²',
        desc: 'Dos dormitorios independientes.',
      },
      de: {
        name: 'Dreibettzimmer',
        label: 'Dreibettzimmer',
        kind: 'Zimmer',
        details: '2–4 Pers.  ·  20 m²',
        desc: 'Zwei getrennte Schlafzimmer.',
      },
    },
  },
  {
    id: 'twin',
    maxGuests: 2,
    count: 1,
    featured: false,
    beds: { single: 2 },
    images: roomPhotos('twin', 6),
    text: {
      fr: {
        name: 'Twin',
        label: 'Chambre Twin',
        kind: 'Chambre',
        details: '1–2 pers.  ·  25 m²',
      },
      en: {
        name: 'Twin',
        label: 'Twin Room',
        kind: 'Room',
        details: '1–2 guests  ·  25 m²',
      },
      es: {
        name: 'Twin',
        label: 'Habitación Twin',
        kind: 'Habitación',
        details: '1–2 pers.  ·  25 m²',
      },
      de: {
        name: 'Twin-Zimmer',
        label: 'Twin-Zimmer',
        kind: 'Zimmer',
        details: '1–2 Pers.  ·  25 m²',
      },
    },
  },
  {
    id: 'standard-double',
    maxGuests: 2,
    count: 2,
    featured: false,
    beds: { double: 1 },
    images: roomPhotos('standard-double', 4),
    text: {
      fr: {
        name: 'Double Standard',
        label: 'Chambre Double Standard',
        kind: 'Chambre',
        details: '1–2 pers.  ·  15 m²',
      },
      en: {
        name: 'Standard Double',
        label: 'Standard Double Room',
        kind: 'Room',
        details: '1–2 guests  ·  15 m²',
      },
      es: {
        name: 'Doble Estándar',
        label: 'Habitación Doble Estándar',
        kind: 'Habitación',
        details: '1–2 pers.  ·  15 m²',
      },
      de: {
        name: 'Standard-Doppelzimmer',
        label: 'Standard-Doppelzimmer',
        kind: 'Zimmer',
        details: '1–2 Pers.  ·  15 m²',
      },
    },
  },
];

export function getRooms(lang: Locale): Room[] {
  return rooms.map(({ text, ...room }) => ({ ...room, ...text[lang] }));
}
