/*
  GERMAN REVIEWS — shown on /de/. Same fields and rules as fr.ts (read its header).

  !!! TEMPORARY DEVELOPMENT CONTENT — NOT REAL GUEST REVIEWS !!!
  Every review below is FICTIONAL and only uses confirmed facts. Replace them with real,
  authorised reviews written in German, then set `isMock: false`.
*/
import type { ReviewsData } from './index';

export const reviews: ReviewsData = {
  isMock: true,
  reviews: [
    { id: 'de-1', platform: 'google', name: 'Lena K.', country: 'DE', rating: 5,
      text: 'Ein herzlicher Empfang vom ersten Moment an. Das Team gab uns tolle Tipps für die Medina, die nur zehn Gehminuten entfernt liegt.' },
    { id: 'de-2', platform: 'booking', name: 'Markus W.', country: 'AT', rating: 9.4,
      text: 'Wir kamen nach einem langen Tag durch das Rif mit zwei Motorrädern an und waren froh über die geschlossene, kostenlose Garage nur für Gäste. Das Zimmer war bequem, und das Frühstück gibt es von 8 bis 10 Uhr, sodass wir morgens nie in Eile waren. Das Team half uns bei der Planung einer Route zur Küste und beantwortete unsere Nachrichten schon vor der Ankunft auf Deutsch. Wir haben direkt gebucht und weniger bezahlt als auf den Buchungsportalen. Die Medina ist zehn Minuten zu Fuß entfernt. Eine klare Empfehlung für alle, die Marokko mit dem Motorrad bereisen.' },
    { id: 'de-3', platform: 'expedia', name: 'Julia S.', country: 'CH', rating: 9.6,
      text: 'Freundliches Team und ein bequemes Zimmer. Wir kommen gerne wieder.' },
  ],
};
