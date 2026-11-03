import type { MetadataRoute } from 'next';
import { IS_PREVIEW, SITE_URL } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', ...(IS_PREVIEW ? { disallow: '/' } : { allow: '/' }) }, sitemap: `${SITE_URL}/sitemap.xml` };
}