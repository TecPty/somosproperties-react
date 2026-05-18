import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// ─── Security Headers ────────────────────────────────────────────────────────
// CSP allowlists only the known third-party services used by the site.
// Next.js App Router requires 'unsafe-inline' for hydration scripts.
// 'unsafe-eval' is needed by some analytics (GTM). Tighten progressively.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval'
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://connect.facebook.net
    https://analytics.tiktok.com
    https://snap.licdn.com
    https://googleads.g.doubleclick.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:
    https://www.google-analytics.com
    https://www.googletagmanager.com
    https://www.facebook.com
    https://px.ads.linkedin.com
    https://analytics.tiktok.com
    https://maps.googleapis.com
    https://maps.gstatic.com;
  font-src 'self' data:;
  connect-src 'self'
    https://www.google-analytics.com
    https://analytics.google.com
    https://www.googletagmanager.com
    https://www.facebook.com
    https://www.facebook.net
    https://analytics.tiktok.com
    https://px.ads.linkedin.com
    https://api.resend.com
    https://maps.googleapis.com;
  frame-src 'self'
    https://www.google.com
    https://maps.google.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`
  .replace(/\n/g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  { key: 'Content-Security-Policy',      value: ContentSecurityPolicy },
  { key: 'X-Frame-Options',              value: 'DENY' },
  { key: 'X-Content-Type-Options',       value: 'nosniff' },
  { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control',       value: 'on' },
];
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    qualities: [75, 80],
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
}

export default withNextIntl(nextConfig)
