import { LOCALE_INFO, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/fill';
import type { Messages } from '@/i18n/messages';
import { ratings } from '@/content/ratings';
import { getReviews, type Review } from '@/content/reviews';
import { RatingLogo } from './RatingLogo';
import { ReviewStrip, type StripReview } from './ReviewStrip';
import { Stars } from './Stars';

// Reviews band. Shows the reviews file of the page's language (content/reviews). Never translates.
export function ReviewsSection({ lang, m }: { lang: Locale; m: Messages }) {
  const t = m.reviews;
  const { intl } = LOCALE_INFO[lang];
  const { isMock, reviews: data } = getReviews(lang);
  const number = new Intl.NumberFormat(intl, { maximumFractionDigits: 1 });

  const prepare = (review: Review): StripReview => {
    const platform = ratings.find(r => r.platform === review.platform);
    const scale = platform?.scale ?? 5;
    const code = review.country.toUpperCase();
    const scoreText = number.format(review.rating);
    return {
      id: review.id,
      lang,
      name: review.name,
      countryName: new Intl.DisplayNames([intl], { type: 'region' }).of(code) ?? code,
      flag: /^[A-Z]{2}$/.test(code) ? code.toLowerCase() : null,
      rating: review.rating,
      scale,
      scoreText,
      rated: fill(t.rated, { score: scoreText, scale }),
      via: fill(t.via, { name: platform?.short ?? platform?.name ?? review.platform }),
      text: review.text,
    };
  };

  const reviews = data.map(prepare);

  return (
    <section className="reviews" id="avis" aria-labelledby="reviews-title" lang={lang}>
      <div className="container">
        <div className="heading heading-center heading-inverse">
          <p className="heading-eyebrow">{t.eyebrow}</p>
          <h2 className="heading-script" id="reviews-title">{t.title}</h2>
        </div>
        <ul className="rating-summary" aria-label={t.platforms}>
          {ratings.map(r => {
            const score = number.format(r.score);
            const inner = (
              <>
                <div className="rating-head">
                  {r.logo && <RatingLogo src={r.logo} />}
                  <p className="rating-platform">{r.name}</p>
                </div>
                <div className="rating-body">
                  <p className="rating-score">
                    <span className="rating-value">{score}</span>
                    <span className="rating-scale">/{r.scale}</span>
                  </p>
                  <Stars score={r.score} scale={r.scale} />
                </div>
                <p className="sr-only">{fill(t.rated, { score, scale: r.scale })}</p>
                {r.count != null && (
                  <p className="rating-count">{fill(t.count, { n: number.format(r.count) })}</p>
                )}
              </>
            );
            return (
              <li className="rating-card" key={r.platform}>
                {r.url ? <a href={r.url} target="_blank" rel="noopener">{inner}</a> : inner}
              </li>
            );
          })}
        </ul>
      </div>
      {reviews.length > 0 ? (
        <ReviewStrip
          reviews={reviews}
          badge={isMock ? t.badge : null}
          more={t.more}
          less={t.less}
        />
      ) : (
        <div className="container">
          <p className="reviews-empty">{t.empty}</p>
        </div>
      )}
    </section>
  );
}
