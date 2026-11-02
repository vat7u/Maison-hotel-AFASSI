export const LOCALES = ['fr', 'en', 'es', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

// intl: the Intl locale. label: the button text. name: the language's own name, for screen readers.
// og: the Open Graph locale.
export const LOCALE_INFO: Record<Locale, { intl: string; label: string; name: string; og: string }> = {
  fr: { intl: 'fr-FR', label: 'FR', name: 'Français', og: 'fr_FR' },
  en: { intl: 'en-GB', label: 'EN', name: 'English', og: 'en_GB' },
  es: { intl: 'es-ES', label: 'ES', name: 'Español', og: 'es_ES' },
  de: { intl: 'de-DE', label: 'DE', name: 'Deutsch', og: 'de_DE' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
