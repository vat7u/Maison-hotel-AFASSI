// Reviews, one file per language: fr.ts, en.ts, es.ts and de.ts in this folder. A language
// shows only its own file, and reviews are never translated or mixed. The owner replaces each
// file by hand with real reviews (see the header of fr.ts).
import { ratings } from '@/content/ratings';
import { ALLOW_INDEXING } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { reviews as en } from './en';
import { reviews as es } from './es';
import { reviews as fr } from './fr';
import { reviews as de } from './de';

export type Review = {
  id: string;
  platform: string;
  name: string;
  country: string;
  rating: number;
  text: string;
};

// isMock is true while the reviews in that file are fictional.
export type ReviewsData = { isMock: boolean; reviews: Review[] };

const byLanguage: Record<Locale, ReviewsData> = { fr, en, es, de };

// A mistake in these files should stop the build, not show wrong text to a guest.
function check(lang: Locale, data: ReviewsData) {
  if (data.reviews.length === 0) throw new Error(`reviews/${lang}.ts has no reviews`);
  if ((ALLOW_INDEXING as boolean) && data.isMock) {
    throw new Error(`reviews/${lang}.ts is still fictional (isMock) but ALLOW_INDEXING is true`);
  }
  const ids = new Set<string>();
  for (const review of data.reviews) {
    if (ids.has(review.id)) throw new Error(`reviews/${lang}.ts repeats the id "${review.id}"`);
    ids.add(review.id);
    if (!ratings.some(r => r.platform === review.platform)) {
      throw new Error(`reviews/${lang}.ts: "${review.id}" has an unknown platform "${review.platform}"`);
    }
    // Intl.DisplayNames throws on a malformed code, which would fail the build later.
    if (!/^[A-Za-z]{2}$/.test(review.country)) {
      throw new Error(`reviews/${lang}.ts: "${review.id}" needs a two-letter country code`);
    }
  }
}

for (const lang of Object.keys(byLanguage) as Locale[]) check(lang, byLanguage[lang]);

export function getReviews(lang: Locale): ReviewsData {
  return byLanguage[lang];
}
