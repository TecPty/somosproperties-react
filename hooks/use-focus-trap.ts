import { useEffect } from 'react';
import type { RefObject } from 'react';

// CAMBIO: admitir refs tipados como `HTMLElement | null`.
// RAZÓN: React 19 tipa `useRef` con null inicial y evita error de asignación en TypeScript estricto.
export function useFocusTrap<T extends HTMLElement>(
  isActive: boolean,
  modalRef: RefObject<T | null>,
  onClose?: () => void
) {
  useEffect(() => {
    if (!isActive || !modalRef.current) return;

    const root = modalRef.current;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable.length) return;

    const preferred = root.querySelector<HTMLElement>('[data-autofocus="true"]');
    const first = preferred ?? focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isActive, modalRef, onClose]);
}
