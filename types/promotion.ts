export type PromotionDateInput = Date | string

export interface PromotionVideoAsset {
  desktop: string
  mobile?: string
  poster?: string
  thumbnail?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  type: 'property-specific' | 'shared';
  images: {
    desktop: string;
    mobile: string;
    thumbnail: string;
  };
  propertyId?: number; // CAMBIO: permite asociar la promoción a una propiedad por ID
  propertySlug?: string;
  autoOpen?: boolean;
  priority?: number;
  validFrom?: PromotionDateInput;
  validUntil?: PromotionDateInput;
  video?: PromotionVideoAsset;
  config?: {
    showDelayMs?: number;
    autoCloseAfterMs?: number;
    disableAutoOpenMobile?: boolean;
    showOncePerSession?: boolean;
  };
}
