import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Privacidade | Astral' },
  description: 'Como a demonstração Astral trata os dados usados para gerar o mapa no navegador.',
  alternates: { canonical: '/privacy' },
  openGraph: pageOpenGraph('Privacidade', 'Como os dados são usados no cálculo local do mapa.', '/privacy'),
};

export default function PrivacyPage() {
  return (
    <main id="conteudo" className="legal-page content-width">
      <p className="eyebrow">Transparência</p>
      <h1>Privacidade</h1>
      <p>Atualizado em 3 de novembro de 2026.</p>

      <h2>Dados do formulário</h2>
      <p>
        A data, o horário e os demais parâmetros informados servem para calcular o mapa no seu
        navegador. Esta versão não envia esses dados a uma API de interpretação, não solicita
        seu nome e não oferece cadastro de conta.
      </p>
      <p>
        O código do Astral não grava os dados de nascimento nem o mapa em cookies, armazenamento
        local ou banco de dados. Eles são mantidos na memória da página durante o uso. O próprio
        navegador pode ter recursos de preenchimento automático, controlados nas configurações dele.
      </p>

      <h2>Sem análise de audiência</h2>
      <p>
        Esta demonstração não usa Vercel Analytics, Speed Insights ou ferramentas de publicidade.
        Também não usa serviços de inteligência artificial, pagamento ou autenticação.
      </p>

      <h2>Hospedagem e registros técnicos</h2>
      <p>
        Ao acessar um site publicado, o provedor de hospedagem recebe informações necessárias
        para atender à conexão, como endereço IP, endereço solicitado e dados técnicos do navegador.
        O cálculo local do mapa não elimina esses registros de infraestrutura. As práticas e os
        prazos de retenção desses registros dependem do provedor utilizado.
      </p>
      <p>
        Durante o uso local, o site é atendido pelo servidor executado no computador. Não informe
        dados pessoais em endereços de página, relatórios de erro ou mensagens públicas.
      </p>

      <h2>Links externos e alterações</h2>
      <p>
        As páginas de créditos incluem links para os projetos de origem. Ao abrir um desses links,
        você passa a utilizar um serviço com suas próprias práticas de privacidade.
      </p>
      <p>
        Esta página descreve a versão demonstrativa atual. A inclusão futura de armazenamento,
        integrações ou outros serviços exige uma revisão desta descrição antes da publicação.
        Consulte também os <a href="/terms">termos de uso</a> e os{' '}
        <a href="/about">créditos e licenças</a>.
      </p>
    </main>
  );
}
