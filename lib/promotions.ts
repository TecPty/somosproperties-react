import { Promotion } from '@/types/promotion';
import { SHARED_PROMOTIONS } from './promotions.config';

function normalizeDate(value?: Date | string): Date | null {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isPromotionActive(promotion: Promotion, now: Date = new Date()): boolean {
  const startsAt = normalizeDate(promotion.validFrom);
  const endsAt = normalizeDate(promotion.validUntil);

  if (startsAt && startsAt > now) return false;
  if (endsAt && endsAt <= now) return false;
  return true;
}

export function getPropertyPromotions(slugOrId: string | number): Promotion[] {
  const propertyPromos: Promotion[] = [];
  // Mostrar banner para Kings Park por slug o por ID (1 y 238)
  if (slugOrId === 'kings-park' || slugOrId === 1 || slugOrId === 238) {
    propertyPromos.push({
      id: 'kings-park-info',
      title: 'Apartamentos en venta',
      description: 'Descubre los mejores apartamentos en Kings Park.',
      // CAMBIO: usar el literal válido del dominio de promociones.
      // RAZÓN: `Promotion.type` solo admite `'property-specific' | 'shared'`.
      type: 'property-specific',
      images: {
        desktop: `/images/properties/kings-park/promotional/modal-desktop-kings-park.png`,
        mobile: `/images/properties/kings-park/promotional/modal-mobile-kings-park.png`,
        thumbnail: `/images/properties/kings-park/promotional/modal-desktop-kings-park.png`,
      },
      propertySlug: 'kings-park',
      autoOpen: true,
      priority: 10,
      validFrom: '2026-01-01T00:00:00.000Z',
      validUntil: '2026-12-31T23:59:59.999Z',
      config: {
        showDelayMs: 2200,
        showOncePerSession: true,
      },
    });
  }
  // CAMBIO: envolver callback para no pasar `index` como segundo argumento.
  // RAZÓN: evita incompatibilidad de tipos con la firma `(promotion, now?: Date)`.
  return [...propertyPromos, ...SHARED_PROMOTIONS].filter((promotion) => isPromotionActive(promotion));
}

export function getAutoOpenPromotion(promotions: Promotion[]): Promotion | undefined {
  return promotions
    .filter((p) => p.autoOpen && isPromotionActive(p))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
}
