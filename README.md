# Astral

Demonstração independente de Zi Wei Dou Shu em português do Brasil. O site gera um mapa básico no navegador, com o motor open-source do projeto [Renhuai123/ziwei-doushu](https://github.com/Renhuai123/ziwei-doushu).

Repositório independente desta adaptação: [anjox35-alt/astral-ptbr](https://github.com/anjox35-alt/astral-ptbr), branch `ptbr-preview`. O histórico publicado não contém o corpus de documentação do upstream.

**Astral não é a plataforma oficial OURANIC e não possui vínculo oficial com ela.** Esta adaptação não inclui a interface comercial original, a base privada de interpretações ou IA completa.

## Origem e escopo

- Commit upstream utilizado: [`a600484a49255039d0725f1ba9e11ca81a948f97`](https://github.com/Renhuai123/ziwei-doushu/commit/a600484a49255039d0725f1ba9e11ca81a948f97).
- Cálculo do mapa básico executado no navegador, sem chave de API.
- Interface, orientações, créditos e páginas legais em português do Brasil.
- Sem interpretação por IA, conversa, compatibilidade, conta, assinatura ou pagamento.
- Sem Vercel Analytics e Speed Insights.
- Sem armazenamento de nascimento, histórico de mapas ou banco de dados.
- Os datasets v3/v4 não são necessários, não foram baixados e não fazem parte desta versão.
- O corpus `docs/tianji-ziwei` e as citações de Tian Ji não fazem parte desta adaptação.

O mapa representa regras de uma tradição astrológica e tem finalidade cultural, educacional e de entretenimento. Não há garantia preditiva. O resultado não substitui orientação profissional nem deve fundamentar decisões importantes.

## Ambiente e execução local

Use Node.js 20.9 ou superior, npm e o `package-lock.json` incluído. A instalação reproduz as versões do lockfile:

```powershell
npm ci
```

A única variável de ambiente da aplicação é a URL pública do site. Para desenvolvimento local, crie `.env.local` com:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Ela é pública e define as URLs de metadados, sitemap e canonical. Não coloque segredos nela. Não é necessário configurar Anthropic, OpenAI, banco, Redis ou qualquer chave de IA.

Para desenvolver em `http://localhost:3000`:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Para verificar os tipos, executar as regressões do motor e compilar:

```powershell
npm run typecheck
npm test
npm run build
```

Depois do build, inicie a aplicação compilada:

```powershell
npm start -- --hostname 127.0.0.1 --port 3000
```

Abra `http://localhost:3000`. Confira o formulário, a geração do mapa, a navegação em celular e desktop, os créditos, a privacidade, os termos e o console do navegador.

Os comandos acima são instruções de execução. Os resultados efetivamente obtidos, os exit codes, as evidências de navegador e eventuais falhas devem ser registrados no relatório de validação; este README não afirma que os testes passaram ou que o projeto já foi publicado.

## Prévia e produção na Vercel

A prévia só deve ser criada após a validação local. Importe o repositório independente como projeto Next.js e configure `NEXT_PUBLIC_SITE_URL` para a URL exata do ambiente. Uma mudança nessa variável exige novo build.

Nome definitivo, conta Vercel e domínio devem ser confirmados pelo proprietário antes do deploy de produção. Para conectar um domínio, obtenha os valores DNS mostrados pela Vercel para esse domínio; não use valores presumidos. Depois da propagação, valide HTTPS, canonical, metadados e sitemap.

Nenhuma URL de prévia, produção ou domínio é declarada aqui antes de ser criada e testada.

## Privacidade

O código usa os parâmetros de nascimento em memória para gerar o mapa. Não os envia para APIs de interpretação nem os grava em cookies, armazenamento local ou banco. O provedor de hospedagem pode processar registros técnicos necessários ao acesso, como IP e URL solicitada. A descrição apresentada no site está em `/privacy`.

## Créditos e licenças

Copyright original: **Copyright (c) 2026 紫微研究**.

O arquivo [LICENSE](./LICENSE) MIT foi preservado integralmente. Os créditos visíveis estão em `/about`, e o site disponibiliza o texto da licença em `/licenses/LICENSE.txt`. Consulte [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) para os créditos do motor e das dependências.

[DATASET-LICENSE](./DATASET-LICENSE) é conservado como documento de origem e não significa que o fork usa os datasets. Os dados de interpretação distribuídos separadamente pelo upstream têm condições próprias e não estão incluídos nesta versão.
