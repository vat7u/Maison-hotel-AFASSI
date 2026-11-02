/*
  ENGLISH REVIEWS — shown on /en/. Same fields and rules as fr.ts (read its header).

  !!! TEMPORARY DEVELOPMENT CONTENT — NOT REAL GUEST REVIEWS !!!
  Every review below is FICTIONAL and only uses confirmed facts. Replace them with real,
  authorised reviews written in English, then set `isMock: false`.
*/
import type { ReviewsData } from './index';

export const reviews: ReviewsData = {
  isMock: true,
  reviews: [
    { id: 'en-1', platform: 'google', name: 'Emily R.', country: 'GB', rating: 5,
      text: 'Our hosts made us feel like family from the moment we arrived. The team gave us great tips for the medina, which is only a ten-minute walk away.' },
    { id: 'en-2', platform: 'booking', name: 'Daniel K.', country: 'US', rating: 9.2,
      text: "We rode in on two motorcycles after a long day through the Rif and were relieved to find a closed garage, free of charge for guests. The room was comfortable, and breakfast is served from 8:00 to 10:00, so we never had to rush in the morning. The staff helped us plan a route towards the coast and answered our messages before we arrived, in English. We booked directly and paid less than on the booking sites. The medina is ten minutes away on foot. Highly recommended for anyone touring Morocco by bike." },
    { id: 'en-3', platform: 'expedia', name: 'Liam O.', country: 'IE', rating: 8.8,
      text: 'Friendly team, a comfortable room and the medina ten minutes away on foot.' },
  ],
};
