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
  propertySlug?: string;
  autoOpen?: boolean;
  priority?: number;
  validUntil?: Date;
  config?: {
    showDelayMs?: number;
    autoCloseAfterMs?: number;
    disableAutoOpenMobile?: boolean;
  };
}
