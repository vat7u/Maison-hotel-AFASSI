import fr from '@/messages/fr.json';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import de from '@/messages/de.json';
import type { Locale } from './config';

export type Messages = typeof fr;

// Every language must hold every key of fr.json, or typecheck fails.
const messages: Record<Locale, Messages> = { fr, en, es, de };

export function getMessages(lang: Locale): Messages {
  return messages[lang];
}
