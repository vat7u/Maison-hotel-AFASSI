'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

// How many rooms of each type the guest asks for, in the order the types were chosen.
export type Chosen = { id: string; count: number }[];

type Booking = {
  chosen: Chosen; // the last type is the room shown in the summary card
  setCount: (id: string, count: number, max: number) => void;
  addRoom: (id: string) => void;
  resetRooms: () => void;
};

const BookingContext = createContext<Booking | null>(null);

// Shares the chosen rooms between the room cards and the booking form. At least one room
// always stays chosen, so the summary card always has something to show.
export function BookingProvider({ initialRoom, children }: { initialRoom: string; children: ReactNode }) {
  const [chosen, setChosen] = useState<Chosen>([{ id: initialRoom, count: 1 }]);

  // Sets the number of rooms of one type, between 0 and max. A type set to 0 leaves the list,
  // unless it is the only one left.
  const setCount = (id: string, count: number, max: number) =>
    setChosen(list => {
      const next = Math.min(Math.max(count, 0), max);
      if (next === 0) return list.length > 1 ? list.filter(item => item.id !== id) : list;
      return list.some(item => item.id === id)
        ? list.map(item => (item.id === id ? { id, count: next } : item))
        : [...list, { id, count: next }];
    });
  // From a room card: chooses one room of that type if none is chosen, and makes it the
  // summary card's room either way.
  const addRoom = (id: string) =>
    setChosen(list => {
      const current = list.find(item => item.id === id);
      return [...list.filter(item => item.id !== id), current ?? { id, count: 1 }];
    });
  const resetRooms = () => setChosen([{ id: initialRoom, count: 1 }]);

  return (
    <BookingContext.Provider value={{ chosen, setCount, addRoom, resetRooms }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const booking = useContext(BookingContext);
  if (!booking) throw new Error('useBooking must be used inside BookingProvider');
  return booking;
}

export function RoomBookLink({ roomId, label }: { roomId: string; label: string }) {
  const { addRoom } = useBooking();
  return (
    <a href="#reserver" className="btn btn-outline btn-sm" onClick={() => addRoom(roomId)}>
      {label}
    </a>
  );
}
