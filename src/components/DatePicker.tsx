'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { de, enGB, es, fr } from 'react-day-picker/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LOCALE_INFO, type Locale } from '@/i18n/config';

// The calendar's own wording per language. It holds functions, so only the language travels as a prop.
const CALENDARS: Record<Locale, typeof fr> = { fr, en: enGB, es, de };

type Props = {
  lang: Locale;
  id: string;
  name: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  firstDay: Date;
  placeholder: string;
  invalid: boolean;
};

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

// A button that opens a calendar in the page's language. Days before firstDay cannot be chosen.
export function DatePicker({ lang, id, name, value, onChange, firstDay, placeholder, invalid }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <input type="hidden" name={name} value={value ? isoDate(value) : ''} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            aria-invalid={invalid}
            className={`booking-control justify-between${value ? '' : ' booking-control-empty'}`}
          >
            {value
              ? value.toLocaleDateString(LOCALE_INFO[lang].intl, { day: 'numeric', month: 'long', year: 'numeric' })
              : placeholder}
            <CalendarIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            locale={CALENDARS[lang]}
            selected={value}
            defaultMonth={value ?? firstDay}
            disabled={{ before: firstDay }}
            onSelect={date => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
