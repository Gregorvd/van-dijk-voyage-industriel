export type Locale = 'fr' | 'en';

export function getLocaleFromPath(path: string): Locale {
  return path.startsWith('/en/') || path === '/en' ? 'en' : 'fr';
}

export function getAlternatePath(path: string): string {
  if (path.startsWith('/en/') || path === '/en') {
    return path.replace(/^\/en/, '') || '/';
  }
  return `/en${path}`;
}

