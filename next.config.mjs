import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  experimental: {
    optimizePackageImports: ["@radix-ui/react-*"],
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default withNextIntl(nextConfig)
