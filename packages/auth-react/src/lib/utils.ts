import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isReactNative(): boolean {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepMerge<T extends object>(base: T, ...others: T[]): T {
  return Object.assign({}, base, ...others);
}

export function getWindowError() {
  if (isBrowser() && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    return params.get('error');
  }

  return null;
}

export const hexIsDark = (hex: string | null | undefined) => {
  if (!hex) return false;

  const c = hex.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 90;
};
