import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  images: { desktop: string; mobile: string };
  alt: string;
}

export function PromotionImage({ images, alt }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <Image
      src={isMobile ? images.mobile : images.desktop}
      alt={alt}
      width={isMobile ? 600 : 1200}
      height={isMobile ? 1000 : 800}
      className="object-contain w-full h-auto"
      priority
    />
  );
}
