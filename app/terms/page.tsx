import type { Metadata } from 'next';
import { pageOpenGraph } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Termos de uso | Astral' },
  description: 'Finalidade, limites e licença da demonstração independente Astral.',
  alternates: { canonical: '/terms' },
  openGraph: pageOpenGraph('Termos de uso', 'Finalidade cultural, limites e licença da demonstração.', '/terms'),
};

export default function TermsPage() {
  return (
    <main id="conteudo" className="legal-page content-width">
      <p className="eyebrow">Uso consciente</p>
      <h1>Termos de uso</h1>
      <p>Atualizado em 3 de novembro de 2026.</p>

      <h2>O que esta demonstração oferece</h2>
      <p>
        Astral é uma adaptação independente em português do Brasil da demonstração open-source
        ziwei-doushu. Seu recurso é a geração de um mapa básico de Zi Wei Dou Shu no navegador,
        a partir dos parâmetros fornecidos no formulário.
      </p>
      <p>
        Astral não é a plataforma oficial OURANIC e não possui vínculo oficial com ela. Esta
        versão não oferece interpretação por IA, conversa, compatibilidade entre mapas, contas,
        assinatura ou pagamentos.
      </p>

      <h2>Finalidade e limites</h2>
      <p>
        A ferramenta tem finalidade cultural, educacional e de entretenimento. O mapa representa
        regras de uma tradição astrológica. Não há garantia de capacidade preditiva ou de
        correspondência com características pessoais ou acontecimentos reais.
      </p>
      <p>
        O resultado depende dos dados informados e das convenções implementadas pelo motor de
        cálculo. Horário, calendário, fuso e critérios de uma escola podem produzir diferenças
        entre ferramentas. Confira as orientações do formulário antes de gerar o mapa.
      </p>
      <p>
        O resultado não substitui avaliação profissional e não deve fundamentar decisões de
        saúde, finanças, direito ou outras decisões importantes da vida.
      </p>

      <h2>Código e licença</h2>
      <p>
        O código derivado é distribuído sob a licença MIT, que permite usar, copiar, modificar
        e distribuir o software com a preservação dos avisos exigidos. O texto integral, incluindo
        a ausência de garantias, está no <a href="/licenses/LICENSE.txt">arquivo LICENSE</a>.
        Esses termos não retiram as permissões concedidas pela licença do código.
      </p>
      <p>
        A demonstração é fornecida no estado em que se encontra, conforme as condições da licença.
        O conteúdo e a disponibilidade podem mudar com o desenvolvimento do projeto.
      </p>

      <h2>Privacidade e créditos</h2>
      <p>
        Leia a <a href="/privacy">descrição de privacidade</a> para conhecer o tratamento dos
        dados do formulário e os <a href="/about">créditos e licenças</a> para consultar a origem
        do código. Esta versão não inclui os datasets de interpretações v3/v4 nem o corpus de
        citações Tian Ji do repositório original.
      </p>
    </main>
  );
}
