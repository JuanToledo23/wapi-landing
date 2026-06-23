// Central place for the WhatsApp CTA link.
// Número temporal en uso (+52 55 8639 6534). Confirmar el definitivo antes de lanzar.
export const WHATSAPP_NUMBER = '525586396534';
export const WHATSAPP_MESSAGE = 'Hola, me interesa conocer Wapi';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const SITE = {
  title: 'Wapi — Todos los mensajes de tu negocio en un solo lugar',
  description:
    'Wapi concentra WhatsApp, Instagram y Messenger en una sola bandeja con un agente de IA entrenado con la información de tu negocio. Para PyMEs mexicanas.',
  url: 'https://wapi.mx',
};
