import { LOCALE_INFO, type Locale } from './config';

// "A, B and C" in the language's own style. Used for lists of room names.
export function joinList(items: string[], lang: Locale): string {
  return new Intl.ListFormat(LOCALE_INFO[lang].intl, { type: 'conjunction', style: 'long' }).format(items);
}
