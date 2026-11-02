/*
  PLATFORM RATINGS — the summary scores shown at the top of the reviews section.

  These are typed in by hand (static). Nothing is fetched from Google, Expedia or
  Booking.com. When a score changes on a platform, update it here.

    platform  short key, also used by each review in content/reviews/*.ts ("google", "expedia", "booking")
    name      name shown on the rating card
    short     optional shorter name used under each review ("Review on Google")
    logo      the platform's logo image. For now this is the site's own icon, served by
              Google's favicon service; to use your own file instead, put it in
              public/images/platforms/ and write e.g. '/images/platforms/booking.svg'.
              null shows no logo.
    score     the platform's overall score, e.g. 4.8
    scale     what the score is out of: 5 for Google, 10 for Expedia and Booking.com
    count     number of reviews on that platform, or null to hide the count
    url       link to the guesthouse's page on that platform, or null for no link

  Cards appear in the order listed below.
*/
export type Rating = {
  platform: string;
  name: string;
  short?: string;
  logo: string | null;
  score: number;
  scale: number;
  count: number | null;
  url: string | null;
};

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

export const ratings: Rating[] = [
  { platform: 'google',  name: 'Google Reviews', short: 'Google', logo: favicon('google.com'),
    score: 4.8, scale: 5,  count: null, url: null },
  { platform: 'expedia', name: 'Expedia',        logo: favicon('expedia.com'),
    score: 9.8, scale: 10, count: null, url: null },
  { platform: 'booking', name: 'Booking.com',    logo: favicon('booking.com'),
    score: 9.4, scale: 10, count: null, url: null },
];
