import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bypass remaining linting during dev
  },
  images: {
    unoptimized: true, // Use unoptimized in dev for speed
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
}

export default withNextIntl(nextConfig)
