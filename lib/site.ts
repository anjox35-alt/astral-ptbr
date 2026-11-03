export const SITE_NAME = 'Astral';
export const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
const parsedUrl = new URL(configuredUrl);
if (!['http:', 'https:'].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
  throw new Error('NEXT_PUBLIC_SITE_URL deve ser a origem HTTP ou HTTPS do site, sem caminho ou credenciais.');
}
export const SITE_URL = parsedUrl.origin;

export function pageOpenGraph(title: string, description: string, path: string) {
  return { title: `${title} | ${SITE_NAME}`, description, url: `${SITE_URL}${path}`, siteName: SITE_NAME, locale: 'pt_BR', type: 'website' as const };
}
