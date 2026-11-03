import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Sobre e licenças | Astral' },
  description: 'Origem open-source, créditos e limites da demonstração Astral em português do Brasil.',
  alternates: { canonical: '/about' },
  openGraph: pageOpenGraph('Sobre e licenças', 'Origem, créditos e limites da demonstração Astral.', '/about'),
};

export default function AboutPage() {
  return (
    <main id="conteudo" className="legal-page content-width">
      <p className="eyebrow">Uma demonstração independente</p>
      <h1>Sobre e licenças</h1>
      <p>
        Astral apresenta uma forma simples de gerar um mapa básico de Zi Wei Dou Shu em português
        do Brasil. O cálculo acontece no próprio navegador, a partir do motor de código aberto do
        projeto ziwei-doushu.
      </p>
      <p>
        Esta é uma adaptação independente da demonstração aberta. Astral não é a plataforma
        oficial OURANIC, não possui vínculo oficial com ela e não oferece sua interface comercial,
        sua base privada de interpretações ou seus serviços de IA.
      </p>

      <h2>Origem do código</h2>
      <p>
        Projeto original:{' '}
        <a href="https://github.com/Renhuai123/ziwei-doushu">Renhuai123/ziwei-doushu no GitHub</a>.
        O copyright original foi preservado: Copyright (c) 2026 紫微研究.
      </p>
      <p>
        Esta adaptação partiu do commit{' '}
        <a href="https://github.com/Renhuai123/ziwei-doushu/commit/a600484a49255039d0725f1ba9e11ca81a948f97">
          a600484a49255039d0725f1ba9e11ca81a948f97
        </a>.
        As mudanças incluem a interface em português do Brasil e a delimitação do produto ao
        mapa básico calculado localmente.
      </p>

      <h2>Licença MIT e dependências</h2>
      <p>
        O código original é disponibilizado sob a licença MIT. O aviso de copyright e o texto
        integral foram mantidos no <a href="/licenses/LICENSE.txt">arquivo LICENSE</a>.
        A licença permite uso, cópia, alteração e distribuição, desde que os avisos exigidos
        sejam preservados. O software é fornecido sem as garantias descritas nessa licença.
      </p>
      <p>
        O motor utiliza as bibliotecas{' '}
        <a href="https://github.com/SylarLong/iztro">iztro</a> e{' '}
        <a href="https://github.com/6tail/lunar-javascript">lunar-javascript</a>.
        Ambas são distribuídas sob a licença MIT. Os copyrights são, respectivamente,
        Copyright (c) 2023 All Contributors e Copyright (c) 2018 6tail. Os avisos completos
        estão nos <a href="/licenses/THIRD_PARTY_NOTICES.txt">avisos de terceiros</a>.
      </p>

      <h2>Conteúdo desta versão</h2>
      <p>
        Não são utilizados os conjuntos de dados de mapas e interpretações v3/v4 do projeto original.
        O corpus de citações Tian Ji e outros textos de interpretação fora do escopo também
        não integram esta demonstração.
      </p>
      <p>
        A ferramenta tem finalidade cultural e educacional. Ela não comprova previsões e não
        substitui orientação profissional. Consulte os <a href="/terms">termos de uso</a> e a{' '}
        <a href="/privacy">descrição de privacidade</a>.
      </p>
    </main>
  );
}
