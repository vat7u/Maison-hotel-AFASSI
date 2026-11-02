/*
  FRENCH REVIEWS — shown on /fr/. The same fields and rules apply to en.ts, es.ts and de.ts.

  !!! TEMPORARY DEVELOPMENT CONTENT — NOT REAL GUEST REVIEWS !!!
  Every review below is FICTIONAL, invented to test the layout (different lengths, ratings
  and platforms). They only use facts the owner has confirmed (see "Confirmed facts" in the
  README). Do not publish them as genuine testimonials. While `isMock` is true, each card
  carries the "Exemple" label, and the build fails if indexing is turned on.

  TO USE REAL REVIEWS
    1. Replace the `reviews` list with real, authorised reviews written in French.
    2. Set `isMock: false`. The label disappears for this language only.

  Fields of each review
    id        any unique text in this file
    platform  "google", "expedia" or "booking" — must match a key in ratings.ts
    name      reviewer's name as shown on the platform
    country   two-letter country code (ISO 3166), e.g. "FR", "MA" — shown as a flag and a
              country name in the site language
    rating    the reviewer's score, on the platform's scale (out of 5 for Google, out of 10
              for Expedia and Booking.com)
    text      the review text, exactly as written (plain text, never translated)
*/
import type { ReviewsData } from './index';

export const reviews: ReviewsData = {
  isMock: true,
  reviews: [
    { id: 'fr-1', platform: 'google', name: 'Camille D.', country: 'FR', rating: 5,
      text: "Un accueil d'une chaleur rare. L'équipe nous a donné de très bons conseils pour visiter la médina, à seulement dix minutes à pied : tout était parfait." },
    { id: 'fr-2', platform: 'booking', name: 'Julien M.', country: 'BE', rating: 9.6,
      text: "Nous avons passé quatre nuits à la maison d'hôtes et nous avions du mal à repartir. La chambre était confortable, et le petit-déjeuner, servi de 8h à 10h, nous laissait le temps de bien commencer la journée. Notre hôte nous a aussi indiqué une randonnée vers Akchour que nous n'aurions jamais trouvée seuls, et il nous avait répondu dans la journée quand nous lui avons écrit avant le voyage. La médina historique est à dix minutes à pied, ce qui rend les allers-retours faciles. Nous avons réservé en direct et cela nous a coûté moins cher que sur les plateformes." },
    { id: 'fr-3', platform: 'expedia', name: 'Sophie L.', country: 'CA', rating: 10,
      text: 'Une équipe attentive et une chambre confortable. Nous reviendrons !' },
    { id: 'fr-4', platform: 'google', name: 'Nadia B.', country: 'MA', rating: 4,
      text: "Très belle maison et équipe adorable. Le garage fermé et gratuit pour la moto est un vrai plus, et les conseils de l'équipe sur la région nous ont beaucoup aidés." },
  ],
};
