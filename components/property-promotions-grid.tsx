'use client';
import { Promotion } from '@/types/promotion';

interface Props {
  promotions: Promotion[];
  onSelect: (promo: Promotion) => void;
}

export function PropertyPromotionsGrid({ promotions, onSelect }: Props) {
  if (!promotions.length) return null;
  return (
    <section className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {promotions.map((promo) => (
          <button
            key={promo.id}
            className="promo-card relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-xl group"
            onClick={() => onSelect(promo)}
          >
            <img
              src={promo.images.thumbnail}
              alt={promo.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-lg font-semibold">Ver detalles</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
