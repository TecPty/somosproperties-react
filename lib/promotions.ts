import { Promotion } from '@/types/promotion';
import { SHARED_PROMOTIONS, PROPERTY_PROMOTIONS } from './promotions.config';

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
  // CAMBIO: buscar promociones por propertyId o propertySlug
  // RAZÓN: permite asociar cualquier propiedad a su promoción desde PROPERTY_PROMOTIONS
  const promos = PROPERTY_PROMOTIONS.filter(
    (promo) => promo.propertyId === slugOrId || promo.propertySlug === slugOrId
  );
  return [...promos, ...SHARED_PROMOTIONS].filter((promotion) => isPromotionActive(promotion));
}

export function getAutoOpenPromotion(promotions: Promotion[]): Promotion | undefined {
  return promotions
    .filter((p) => p.autoOpen && isPromotionActive(p))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
}
