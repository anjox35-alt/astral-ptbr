import type { Metadata } from 'next';
import LocalChart from '@/components/LocalChart';
import { pageOpenGraph } from '@/lib/site';
export const metadata: Metadata = {
  title: 'Gerar mapa',
  description: 'Gere seu mapa básico de Zi Wei Dou Shu no navegador, em português do Brasil.',
  alternates: { canonical: '/chart' },
  openGraph: pageOpenGraph('Gerar mapa', 'Gere seu mapa básico de Zi Wei Dou Shu no navegador, em português do Brasil.', '/chart'),
};
export default function ChartPage() {
  return <main id="conteudo" className="content-width main-content">
    <section className="intro compact"><h1>Gerar seu mapa Zi Wei</h1><p>Preencha a data e a hora locais de nascimento. O cálculo acontece neste navegador.</p></section>
    <LocalChart />
  </main>;
}
