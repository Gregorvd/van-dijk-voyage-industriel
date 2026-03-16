export type Locale = 'fr' | 'en';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prepend the base path to any internal URL. */
export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) return path;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}

function stripBase(path: string): string {
  return base && path.startsWith(base) ? path.slice(base.length) || '/' : path;
}

export function getLocaleFromPath(path: string): Locale {
  const p = stripBase(path);
  return p.startsWith('/en/') || p === '/en' ? 'en' : 'fr';
}

export function getAlternatePath(path: string): string {
  const p = stripBase(path);
  if (p.startsWith('/en/') || p === '/en') {
    return url(p.replace(/^\/en/, '') || '/');
  }
  return url(`/en${p}`);
}
