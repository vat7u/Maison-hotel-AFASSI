/*
  SPANISH REVIEWS — shown on /es/. Same fields and rules as fr.ts (read its header).

  !!! TEMPORARY DEVELOPMENT CONTENT — NOT REAL GUEST REVIEWS !!!
  Every review below is FICTIONAL and only uses confirmed facts. Replace them with real,
  authorised reviews written in Spanish, then set `isMock: false`.
*/
import type { ReviewsData } from './index';

export const reviews: ReviewsData = {
  isMock: true,
  reviews: [
    { id: 'es-1', platform: 'booking', name: 'Lucía G.', country: 'ES', rating: 10,
      text: 'Un trato inmejorable desde el primer momento. El equipo nos dio consejos muy útiles y la medina queda a diez minutos andando.' },
    { id: 'es-2', platform: 'google', name: 'Mateo R.', country: 'AR', rating: 5,
      text: 'Viajamos en moto desde Tánger y elegimos esta casa por el garaje cerrado y gratuito para los clientes, pero lo que nos conquistó fue el equipo. Nos recomendaron rutas por el Rif y sitios donde comer, y nos respondieron por mensaje antes del viaje. El desayuno se sirve de 8:00 a 10:00, y la medina está a diez minutos a pie. Reservamos directamente y nos salió más barato que en las plataformas. Volveremos sin duda en nuestro próximo viaje por Marruecos.' },
    { id: 'es-3', platform: 'expedia', name: 'Valentina C.', country: 'MX', rating: 9.4,
      text: 'Habitación cómoda y un equipo muy atento. Nos ayudaron con todo lo que preguntamos.' },
  ],
};
