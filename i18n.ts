import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

// Idiomas soportados
export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener locale de la request
  let locale = await requestLocale;
  
  // Validar y usar default si es necesario
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
