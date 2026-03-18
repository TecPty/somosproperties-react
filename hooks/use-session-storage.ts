import { useCallback } from 'react';

export function useSessionStorage(key: string) {
  const get = useCallback(() => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(key);
  }, [key]);

  const set = useCallback((value: string) => {
    if (typeof window !== 'undefined') sessionStorage.setItem(key, value);
  }, [key]);

  return { get, set };
}
