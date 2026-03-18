import { Promotion } from '@/types/promotion';
import { SHARED_PROMOTIONS } from './promotions.config';

export function getPropertyPromotions(slugOrId: string | number): Promotion[] {
  const propertyPromos: Promotion[] = [];
  // Mostrar banner para Kings Park por slug o por ID (1 y 238)
  if (slugOrId === 'kings-park' || slugOrId === 1 || slugOrId === 238) {
    propertyPromos.push({
      id: 'kings-park-info',
      title: 'Apartamentos en venta',
      description: 'Descubre los mejores apartamentos en Kings Park.',
      type: 'info',
      images: {
        desktop: `/images/properties/kings-park/promotional/modal-desktop-kings-park.png`,
        mobile: `/images/properties/kings-park/promotional/modal-mobile-kings-park.png`,
        thumbnail: `/images/properties/kings-park/promotional/modal-desktop-kings-park.png`,
      },
      propertySlug: 'kings-park',
      autoOpen: true,
      priority: 10,
    });
  }
  return [...propertyPromos, ...SHARED_PROMOTIONS];
}

export function getAutoOpenPromotion(promotions: Promotion[]): Promotion | undefined {
  return promotions
    .filter((p) => p.autoOpen && (!p.validUntil || p.validUntil > new Date()))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
}
