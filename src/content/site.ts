// Contact details, external links and site-wide settings.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Keep false during development: every page tells search engines not to list it,
// because the site still contains example reviews and placeholder details.
// Set to true only when the launch checklist is finished.
export const ALLOW_INDEXING = false;

export const INSTAGRAM_URL = 'https://www.instagram.com/maisondhotesafassi10/';
export const TRIPADVISOR_URL =
  'https://www.tripadvisor.fr/Hotel_Review-g304013-d25357271-Reviews-Maison_D_hotes_Afassi-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html';

export const MAPS_URL = 'https://maps.app.goo.gl/YbpwUciVzjX2Kv2b7';

export const PHONE_DISPLAY = '+212 5 39 88 38 43';
export const PHONE_LINK = 'tel:+212539883843';
export const EMAIL = 'maisonhotelafassi@gmail.com';
