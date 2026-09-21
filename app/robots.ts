import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.somosproperties.com'

// La API vive bajo /[locale]/api desde la migracion a next-intl
const privatePaths = [
  '/api',
  ...locales.map((locale) => `/${locale}/api`),
  '/admin',
  '/*.json$',
  '/*?*sort=',
  '/*?*page=',
]

// Bots de IA permitidos para que las propiedades aparezcan en ChatGPT y Claude
const aiBots = [
  'OAI-SearchBot', // búsqueda de ChatGPT
  'ChatGPT-User', // ChatGPT abriendo una página a pedido del usuario
  'GPTBot', // entrenamiento de OpenAI
  'Claude-SearchBot', // búsqueda de Claude
  'Claude-User', // Claude abriendo una página a pedido del usuario
  'ClaudeBot', // entrenamiento de Anthropic
  'CCBot', // Common Crawl
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Googlebot usa este grupo a propósito: Google no soporta crawl-delay,
      // y un grupo propio para Googlebot haría que ignore privatePaths.
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: privatePaths,
        crawlDelay: 2,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: aiBots,
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
