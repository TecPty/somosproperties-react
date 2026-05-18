/**
 * Simple in-memory rate limiter for Next.js API Routes on Vercel.
 *
 * NOTE: Each Vercel serverless function runs in its own instance, so this
 * store is per-instance, not global. It's still very effective against
 * unsophisticated bots that hit the same region repeatedly. For a globally
 * consistent rate limit, pair this with Vercel KV or Upstash Redis later.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Check if a given identifier (usually an IP) has exceeded the rate limit.
 *
 * @param identifier - e.g. client IP address
 * @param limit      - max requests allowed in the window
 * @param windowMs   - rolling window in milliseconds
 * @returns `{ limited: true }` if the limit is exceeded, `{ limited: false }` otherwise
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now >= entry.resetAt) {
    // First request in this window
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { limited: false, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/**
 * Extract the best available client IP from a Next.js Request.
 * Vercel forwards the real IP via `x-forwarded-for`.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
