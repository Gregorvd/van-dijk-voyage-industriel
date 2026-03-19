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

const slugMap: Record<string, string> = {
  'etudes-de-cas': 'case-studies',
  'pays-et-culture': 'countries',
  'a-propos': 'about',
  'bilan': 'skills',
  'limites': 'limits',
  'annexes': 'appendices',
};

const slugMapReverse: Record<string, string> = Object.fromEntries(
  Object.entries(slugMap).map(([k, v]) => [v, k])
);

export function getAlternatePath(path: string): string {
  const p = stripBase(path);
  if (p.startsWith('/en/') || p === '/en') {
    // EN → FR: replace English slugs with French ones
    let frPath = p.replace(/^\/en/, '') || '/';
    for (const [en, fr] of Object.entries(slugMapReverse)) {
      frPath = frPath.replace(`/${en}/`, `/${fr}/`);
      frPath = frPath.replace(`/${en}`, `/${fr}`);
    }
    return url(frPath);
  }
  // FR → EN: replace French slugs with English ones
  let enPath = p;
  for (const [fr, en] of Object.entries(slugMap)) {
    enPath = enPath.replace(`/${fr}/`, `/${en}/`);
    enPath = enPath.replace(`/${fr}`, `/${en}`);
  }
  return url(`/en${enPath}`);
}
