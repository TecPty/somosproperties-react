import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  images: { desktop: string; mobile: string };
  alt: string;
}

export function PromotionImage({ images, alt }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  const src = isMobile ? images.mobile : images.desktop;
  if (hasError || !src) {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
        Imagen promocional no disponible.
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={isMobile ? 720 : 1280}
      height={isMobile ? 1120 : 840}
      sizes="(max-width: 767px) 92vw, (max-width: 1280px) 76vw, 900px"
      className="h-auto w-full object-contain"
      loading="eager"
      priority={false}
      onError={() => setHasError(true)}
    />
  );
}
