import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { SITE_NAME, SITE_URL, IS_PREVIEW } from '@/lib/site';
const description = 'Demonstração independente em português do Brasil para gerar um mapa básico de Zi Wei Dou Shu no navegador, sem inteligência artificial ou cadastro.';
export const metadata: Metadata = {
  title: { default: `${SITE_NAME} | Mapa Zi Wei em português`, template: `%s | ${SITE_NAME}` },
  description, applicationName: SITE_NAME, metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { title: `${SITE_NAME} | Mapa Zi Wei em português`, description, url: SITE_URL, siteName: SITE_NAME, locale: 'pt_BR', type: 'website' },
  twitter: { card: 'summary', title: `${SITE_NAME} | Mapa Zi Wei em português`, description },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header"><div className="content-width header-inner">
      <Link className="brand" href="/" aria-label="Astral — início"><span aria-hidden="true">✦</span> Astral</Link>
      <nav aria-label="Navegação principal"><Link href="/chart">Gerar mapa</Link><Link href="/about">Sobre / Licenças</Link></nav>
    </div></header>
    {children}
    <footer className="site-footer content-width">
      <div><Link className="brand" href="/"><span aria-hidden="true">✦</span> Astral</Link><p>Uma demonstração para explorar uma tradição.<br />O mapa não é uma previsão comprovada.</p></div>
      <nav aria-label="Informações do site"><Link href="/about">Sobre / Licenças</Link><Link href="/privacy">Privacidade</Link><Link href="/terms">Termos de uso</Link></nav>
      <p className="credit">Motor de código aberto: <a href="https://github.com/Renhuai123/ziwei-doushu" target="_blank" rel="noopener noreferrer">ziwei-doushu</a> · Licença MIT.</p>
    </footer>
  </body></html>;
}