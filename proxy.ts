import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Lista de todos los locales soportados
  locales,
  
  // Locale por defecto cuando ninguno coincide
  defaultLocale,
  
  // Detectar automáticamente el locale del navegador
  localeDetection: true,
  
  // Prefijo de locale en la URL (siempre mostrar /es o /en)
  localePrefix: 'always',
});

export const config = {
  // Aplicar middleware a todas las rutas excepto API, static files, etc.
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
