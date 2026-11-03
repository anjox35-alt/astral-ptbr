# Astral — implementação e validação

Data: 3 de novembro de 2026. Nome provisório: **Astral**.

## Origem e inspeção

- Upstream: https://github.com/Renhuai123/ziwei-doushu
- SHA utilizado: `a600484a49255039d0725f1ba9e11ca81a948f97`.
- Inspeção integral de README/README.en, LICENSE, DATASET-LICENSE, package.json, configuração Next, app/, components/ e lib/, dividida entre três agentes e o orquestrador.
- Não havia i18n nem PT-BR. Interface chinesa com textos ingleses pontuais, analytics no layout, formulário com referências chinesas de horário/local e chamadas a APIs ausentes.
- O plano de arquivos foi apresentado no chat antes das alterações.
- O cálculo básico é síncrono no navegador. O motor e suas tabelas foram preservados sem alteração; a nova entrada e a apresentação estão separadas dele.

## Produto implementado

- Interface PT-BR em `/` e `/chart`, formulário acessível e mapa de 12 casas, com resumo numérico do calendário lunar.
- Tradução organizada em `lib/i18n/ui.ts` e `lib/i18n/chart-pt-BR.ts`. Nomes próprios de estrelas usam romanização; rótulos usam português. Identificadores internos do motor permanecem inalterados.
- Data e hora civis locais, entre 1900 e 2100. Sem converter para Pequim e sem corrigir automaticamente fuso, longitude, horário de verão ou hora solar. A interface explica essas limitações.
- A regra upstream das 23h usa o dia seguinte; o resultado apresenta separadamente nascimento informado e dia de cálculo.
- Visualização básica de estrelas principais e auxiliares; estrelas menores omitidas com aviso visível. Nenhuma interpretação ou previsão foi adicionada.
- Sobre/Licenças, Privacidade e Termos reescritos; marca, títulos, idioma, metadados, Open Graph, favicon, sitemap e robots atualizados.
- IA, conversa, compatibilidade, contas, pagamentos, biblioteca/citações e análises fora do escopo não integram o produto. Rotas antigas não têm botões nem navegação; respondem 404.
- Analytics/Speed Insights e dependências de IA/banco/Redis/exportação sem uso foram removidos de package.json e lockfile.
- Sem envio de nascimento em API/querystring e sem armazenamento ativo no fluxo. O módulo legado school-config conserva helpers de storage, mas o produto não os chama.

## Créditos e exclusões

- LICENSE MIT e DATASET-LICENSE preservados integralmente. Copyright original: `Copyright (c) 2026 紫微研究`.
- Link ao upstream e copyright visíveis em `/about`; LICENSE integral em `/licenses/LICENSE.txt`.
- Licenças instaladas de iztro 2.6.1 e lunar-javascript 1.7.7 lidas; avisos MIT em THIRD_PARTY_NOTICES.md e `/licenses/THIRD_PARTY_NOTICES.txt`.
- Nenhum dataset v3/v4 foi baixado ou utilizado. Nenhuma atribuição de uso desses datasets é feita.
- `docs/` não foi materializada no checkout; `docs/tianji-ziwei` não integra a adaptação. Citações e módulos editoriais fora do escopo ficaram fora do código publicado.
- Fontes antigas foram guardadas reversivelmente em `.upstream-reference/`, apenas local, excluída por Git, TypeScript e Vercel. A revisão automática recusou a exclusão em lote; esta alternativa preserva a recuperação sem publicar esse conteúdo.

## Gates locais — APROVADOS

Ambiente observado: Windows, Node.js v24.16.0, npm 11.13.0, Next.js 16.4.3, React/React DOM 19.3.0. A instalação usa o lockfile; não houve troca arbitrária por versões latest.

| Comando realmente executado | Exit code | Evidência |
| --- | ---: | --- |
| `npm ci --no-audit --no-fund` no lockfile upstream | 0 | 181 pacotes instalados |
| `npm uninstall @anthropic-ai/sdk @types/pg @vercel/analytics @vercel/speed-insights clsx framer-motion html2canvas ioredis pg --ignore-scripts --no-audit --no-fund` | 0 | 68 pacotes retirados |
| `npm ci --no-audit --no-fund` no lockfile final | 0 | 113 pacotes instalados |
| `npm run typecheck` | 0 | tsc --noEmit |
| `npm test` | 0 | Seis regressões upstream e nova regressão PT-BR |
| `npm run build` | 0 | Todas as dez saídas estáticas geradas, sem rotas de API |
| `git diff --check` | 0 | Sem erro de whitespace; avisos Git de normalização LF/CRLF |
| `npm start -- --hostname 127.0.0.1 --port 3000` | Em execução | Ready in 206 ms; servidor mantido para revisão |

As regressões incluem 768 mapas × 7 invariantes do motor e 240 mapas/109 termos na cobertura de tradução, além de entradas inválidas, calendário real, anos bissextos, fronteiras dos intervalos horários, viradas de dia/mês/ano e preservação da entrada.

Tentativas não aprovadas como sucesso: a instalação limpa restrita encontrou EPERM ao substituir esbuild; a repetição autorizada terminou com 0. O primeiro build restrito ficou sem progresso na compilação e foi interrompido com exit 1; o build fora dessa limitação terminou com 0. Uma amostragem inicial de 2.880 mapas foi interrompida por duração e substituída por 240 mapas; ela não é contada como teste aprovado. Uma consulta HTTP por PowerShell restrito não alcançou o socket local; os status foram confirmados depois no navegador.

Logs locais em `evidencias/*.log` (ignorados no Git). A lista detalhada de arquivos está em `evidencias/arquivos-alterados.txt`.

Verificação remota adicional: a execução de CI [41604023667](https://github.com/anjox35-alt/astral-ptbr/actions/runs/41604023667), no commit `5d18bf9853c0722c04b8b5a397b9ae41fd4f9755`, terminou com `status=completed` e `conclusion=success`, confirmado por `gh run list` (exit 0). O workflow executa instalação pelo lockfile, typecheck, testes e build em Ubuntu/Node 22. Isto é adicional aos gates locais.

Revisão editorial posterior: as páginas Sobre/Termos passaram a dizer “código aberto” e “conjuntos de dados”. Novo `npm run build`: **exit 0**, em `evidencias/build-final.log`, incluindo verificação TypeScript e todas as dez saídas estáticas. Sem mudança de lógica de cálculo após as regressões aprovadas.

Varredura limitada dos 12 arquivos JavaScript de `.next/static` por padrões conhecidos de chaves de provedores: zero candidatos, comando exit 0, sem imprimir valores. Não houve chave de IA configurada; a aplicação referencia apenas SITE_URL e variáveis de ambiente da Vercel para identificar o ambiente/URL. Essa checagem não é uma auditoria exaustiva de segredos.

## Navegador local — APROVADO

URL testada: **http://localhost:3000**. Testes na aplicação compilada, por Chrome DevTools, em contexto isolado.

- Desktop 1440×1000: geração em `/` e `/chart`, 12 casas, grade tradicional com quatro colunas, sem overflow horizontal, sem termos não catalogados, sem erros/avisos no console.
- Celular emulado 390×844 com toque: formulário e mapa com duas colunas, 12 casas e sem overflow horizontal. Não é teste em dispositivo físico.
- Entrada sintética `1990-06-15 14:30`: geração concluída; casos masculino e feminino verificados.
- Entrada sintética `2000-12-31 23:30`: nascimento preservado como 31/12/2000; dia do cálculo 01/01/2001; aviso da convenção exibido.
- Envio de formulário vazio: erro em português exibido. Datas/horas inválidas adicionais cobertas pela regressão.
- Sobre/Licenças, Privacidade e Termos abertos pelos links e inspecionados. Metadados/canonical/og:url próprios por rota.
- Rotas reais, favicon, licenças, robots e sitemap: HTTP 200. Sitemap com somente as cinco páginas reais.
- `/heming`, `/knowledge`, `/library`, `/api/interpret`, `/api/heming`: HTTP 404, verificados deliberadamente, fora do fluxo do usuário.
- No fluxo de geração: zero chamadas `/api/`, zero recursos externos e contagens zero de localStorage/sessionStorage. Nenhum valor de cookie foi coletado.
- Capturas desktop e celular foram exibidas e inspecionadas no chat. A ferramenta de navegador recusou salvar capturas no caminho local por configuração própria de workspace; os resultados estruturados estão em `evidencias/navegador-local.json`.
- O preenchimento de date/time pelo helper do DevTools não atualizou o estado React de forma consistente; o teste usou o setter nativo com eventos input/change e clique real no botão, sem chamar o algoritmo ou funções React diretamente.

## Preview Vercel

Somente iniciado após os gates locais. **PREVIEW E PRODUÇÃO PUBLICADOS E VERIFICADOS. Domínio próprio ainda não registrado.**

- Preview: https://astral-ptbr-preview-fon6.vercel.app
- Produção: https://astral-ptbr.vercel.app
- Painel: https://vercel.com/fon6/astral-ptbr
- Commit publicado nos dois ambientes: `d7295f7d058acf970b32bef7c2f0e077a7f8695d`.

- Repositório independente criado e enviado: https://github.com/anjox35-alt/astral-ptbr, branch `ptbr-preview`.
- Commit de implementação validada: `5d18bf9853c0722c04b8b5a397b9ae41fd4f9755`. Histórico raiz independente, sem pais upstream. Motor e licenças comparados contra a branch upstream local: nenhuma diferença.
- Equipe confirmada pelo proprietário: FON (`fon6`). Conta CLI autenticada: `anjox35-9469`.
- Projeto criado: https://vercel.com/fon6/astral-ptbr. ID `prj_q2w1mIszCSE9qcQJxcTcSyUEtVHB`, equipe `team_PNsFnGMY8e31oaVYx6xE0mGj`, framework Next.js, Node 24.x, instalação `npm ci --no-audit --no-fund`, build `npm run build`.
- Criação autenticada pela CLI/API: exit 0; `vercel link --yes --scope fon6 --project astral-ptbr`: exit 0. A inspeção inicial confirmou zero deployments, antes das publicações descritas abaixo.
- `vercel.json` desativa deploys automáticos por Git. Os deployments foram solicitados explicitamente pela CLI, com ambiente indicado.
- `NEXT_PUBLIC_SITE_URL` foi configurada como Config pública, separadamente em Production (`https://astral-ptbr.vercel.app`) e Preview (`https://astral-ptbr-preview-fon6.vercel.app`), usando `vercel env add ... --environment ... --value ... --no-sensitive --project astral-ptbr --scope fon6 --yes`, exit 0. O primeiro endereço foi obtido da lista de domínios da Vercel; o alias estável de Preview foi criado por `vercel alias set`, confirmado com exit 0 e atribuído novamente após o build final. Ambos os builds finais já incluíram a variável correta.
- Tentativa anterior pelo conector `create_project`, escopo explícito `fon6`, projeto `astral-ptbr`: Vercel retornou **403 forbidden — You don't have permission to create the project**. Essa tentativa não criou projeto; a CLI autenticada criou o projeto posteriormente.
- Alternativa indicada pelo próprio conector: CLI oficial. Versão consultada no registro npm: 65.10.0. `npx --yes --package=vercel@65.10.0 vercel whoami --scope fon6`: **exit 1, login_required, saved login is not valid or has expired**.
- O login oficial da CLI foi concluído posteriormente pelo proprietário; `vercel whoami --scope fon6` confirmou a conta, e `vercel teams ls` confirmou FON no plano Hobby.
- Solicitação de autorização para login oficial apresentada ao proprietário, porque suas instruções exigem autorização específica para alterar credenciais. Não se solicitou senha/token no chat.
- A criação com `gitRepository` e a primeira conexão por `vercel git connect` falharam por falta de acesso ao repositório. A inspeção no GitHub mostrou que a integração oficial já existia, limitada a outro repositório. Após a escolha explícita do proprietário, `anjox35-alt/astral-ptbr` foi adicionado à seleção, preservando o acesso preexistente e sem selecionar todos os repositórios. `Genuino-Engine/Ar` não foi alterado nem utilizado.
- `vercel git connect https://github.com/anjox35-alt/astral-ptbr --scope fon6 --yes`: exit 0, Connected. Leitura posterior da API confirmou `link.type=github`, `org=anjox35-alt`, `repo=astral-ptbr` e `productionBranch=ptbr-preview`. Nesse momento inicial ainda não existiam deployments. Deploy automático por Git permanece desativado no código.
- CI do código mais recente `f207c020de91aebe3d41b3db2b86ffb70afafb24`: `completed/success`, confirmado por `gh run list` (exit 0), execução https://github.com/anjox35-alt/astral-ptbr/actions/runs/41604856868.
- `vercel deploy --dry --json --environment preview --project astral-ptbr --scope fon6`: exit 0, 55 arquivos, zero caminhos privados/proibidos selecionados, LICENSE e licença pública presentes. Evidência: `evidencias/vercel-source-inspection.json`. Nenhum deploy é criado por esse comando.
- `vercel link` gerou uma variável OIDC local da plataforma; seu valor não foi lido nem registrado. `.env.local` e `.vercel/` foram confirmados como ignorados por Git e excluídos da seleção de deploy.
- Exceção necessária à ordem original: `vercel deploy --environment preview --project astral-ptbr --scope fon6 --yes --json --no-wait` terminou com **exit 1 e nenhum deployment**, porque a Vercel exige Production no primeiro deployment de um projeto novo. Isso foi confirmado na [documentação oficial](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting). O proprietário respondeu **“pode fazer”** após a explicação de que não seria usado `--prod` sem confirmação. Foi então criado o primeiro Production no endereço da plataforma, sem domínio próprio. Os deployments seguintes puderam ser Preview.
- Ajuste encontrado na validação pública: faltava link visível para o fork em Sobre. A primeira verificação HTTP de Preview terminou com exit 1 e foi preservada em `attempts` do artefato. Corrigidos o link e uma descrição que continha “open-source”. Novo `npm run typecheck`: exit 0; `npm run build`: exit 0, dez saídas estáticas, log `evidencias/build-sobre-final.log`. O servidor local desta tarefa foi reiniciado; a verificação HTTP de `/about` retornou 200 com link e descrição novos, exit 0. A lógica do mapa não mudou.
- `vercel deploy --environment preview --project astral-ptbr --scope fon6 --yes --json --no-wait`: exit 0 para o Preview final `dpl_ELFPpcVUDBN9MJMintvyZweeRjcf`; API confirmou `READY`, `target=null` (Preview) e SHA `d7295f7d058acf970b32bef7c2f0e077a7f8695d`.
- Após aprovação de HTTP e navegador no Preview corrigido, `vercel deploy --prod --project astral-ptbr --scope fon6 --yes --json --no-wait`: exit 0 para Production `dpl_EjecgXbSJpCX2sNRjEEqQDoY2ogX`; API confirmou `READY`, `target=production` e o mesmo SHA.
- `vercel inspect <URL> --scope fon6 --logs`: exit 0 nos dois ambientes finais. Logs `evidencias/vercel-preview-build.log` e `evidencias/vercel-producao-build.log` contêm compilação concluída, dez saídas estáticas e `Build Completed`. Logs são locais e ignorados no Git.
- CI do commit publicado: [41661705950](https://github.com/anjox35-alt/astral-ptbr/actions/runs/41661705950), `completed/success`, confirmado por `gh run list`, exit 0. Executou novamente lockfile, typecheck, regressões e build.

## Validação pública — APROVADA

| Verificação | Resultado e evidência |
| --- | --- |
| Preview HTTP anônimo | 23 requisições e oito arquivos JavaScript; verificador exit 0, `evidencias/http-preview.json` |
| Produção HTTP anônimo | 20 requisições, 175 asserções aprovadas; verificador exit 0 e todos os processos curl exit 0, `evidencias/http-producao.json` |
| HTTPS | TLS validado pelo curl, sem desativar verificação de certificado |
| Páginas, favicon, documentos de licença, robots e sitemap | HTTP 200; rotas antigas e APIs fora do escopo HTTP 404 |
| SEO | `pt-BR`, títulos e descrições em português, canônicas e `og:url` específicas; sitemap com cinco URLs. Preview `noindex/nofollow`, robots `Disallow: /`; produção `index/follow`, robots `Allow: /` |
| Licenças | MIT e avisos de terceiros públicos correspondem aos arquivos locais; créditos, link original, fork e SHA upstream presentes |
| Scripts públicos | Nenhuma assinatura procurada de Analytics/Speed Insights ou padrão conhecido de chave nos oito scripts indicados pelo HTML; é uma varredura limitada, não uma auditoria universal de segredos |
| Preview desktop | 1440×1000, formulário e 12 casas, quatro colunas, sem overflow; erro de formulário vazio em português |
| Preview celular emulado | 390×844 com toque, formulário em `/chart`, 12 casas, duas colunas e sem overflow; nenhum aparelho físico testado |
| Caso funcional | `2000-12-31 23:30`, masculino: nascimento preservado, cálculo em `01/01/2001`, Rato, Fogo — ciclo 6, lunar `7/12/2000`, identidade/corpo Boi |
| Console, rede e estado | Zero erros/avisos de console e exceções; zero `/api/`, zero POST, zero origens externas HTTP(S), zero entradas em localStorage/sessionStorage no fluxo do mapa |
| Navegação real | Sobre/Licenças, Privacidade e Termos abertos pelos links e inspecionados no navegador |

Evidência estruturada do navegador: `evidencias/navegador-publico.json`. O formulário foi preenchido por controles nativos de data/hora (AX) e enviado pelo botão real, sem invocar o motor diretamente. O helper Playwright de preenchimento não atualizou esses controles corretamente; no modo celular, o botão foi acionado pelo locator semântico após o clique AX não enviar o formulário. A captura de rede desktop incluiu duas imagens `data:` incorporadas e uma imagem da extensão do navegador, sem serviço externo da aplicação. Nenhum cookie, conteúdo de armazenamento, cabeçalho ou corpo de requisição foi salvo. As emulações e a captura de rede foram desativadas ao terminar.

Capturas de Preview desktop/celular e da configuração DNS foram salvas localmente na pasta de visualizações do Codex, fora do repositório e do pacote publicado. Um pedido de captura de página inteira pelo protocolo expirou; a captura suportada pelo navegador foi usada em seguida. O teste funcional em produção ocorreu antes do ajuste editorial final; o Preview funcional e a validação HTTP de produção final correspondem ao SHA publicado. O ajuste editorial não alterou o cálculo.

Núcleo mantido: comparação Git contra `main` upstream de `algorithm.ts`, `constants.ts`, `types.ts`, configuração/tabelas de escola, `true-solar-time.ts`, LICENSE e DATASET-LICENSE terminou com exit 0, sem diferença. Outros módulos legados de `lib/ziwei` foram retirados do produto conforme o escopo; não se alega que toda a pasta permaneceu idêntica.

## Setup global Vercel solicitado

Guia solicitado e lido integralmente: https://vercel.com/get-started.md. A ferramenta web recusou o tipo `text/markdown`; a leitura HTTP direta foi concluída com exit 0.

- CLI global: `npm install --global vercel@latest`, exit 0. `vercel --version`: 65.10.0; `vercel whoami --scope fon6`: autenticado.
- Plugin: `npx --yes plugins add vercel/vercel-plugin --target codex --scope user --yes`, exit 0. `codex plugin list --json` confirmou `vercel@openai-curated-remote`, versão 0.54.1, `installed=true`, `enabled=true`. A instalação foi limitada ao Codex, sem instalar nos outros editores propostos pelo instalador. Não foi instalado o pacote adicional de skills separado.
- MCP compartilhado: `codex mcp add vercel --url https://mcp.vercel.com` adicionou a entrada global. A primeira espera OAuth expirou; a retomada `codex mcp login vercel --scopes openid,offline_access` concluiu com exit 0. `codex mcp list --json` confirmou `enabled=true`, `auth_status=o_auth` e endpoint correto, sem expor credenciais.
- Smoke funcional em sessão efêmera da CLI: exit 0; eventos reais no servidor `vercel` confirmaram uma chamada `list_teams` e duas `search_vercel_documentation`, todas concluídas e sem erro. Resultado sanitizado em `evidencias/mcp-vercel-smoke.json`. A primeira tentativa restrita falhou antes de qualquer chamada, por acesso ao estado local; a repetição autorizada passou. O isolamento de inicialização não foi completo: plugins de outros serviços tentaram handshakes, sem chamadas do modelo a esses serviços. Não houve mudança de configuração ou autenticação desses outros serviços.
- Configuração: `C:/Users/Anjox/.codex/config.toml`; backup privado em `config.toml.vercel-setup-20261103.backup`, hash conferido e ACLs iguais às do original. Comparação dos demais campos encontrou 128 valores equivalentes, reformatação de TOML e omissão de um array de argumentos vazio; nenhum argumento foi acrescentado e nenhuma outra configuração foi restaurada ou descartada.
- Nenhuma política de aprovação foi afrouxada, nenhum aplicativo do usuário ou sessão remota foi reiniciado. O único servidor reiniciado foi o servidor local desta tarefa após novo build. Projetos existentes não foram alterados. O conector de aplicativos ainda não enxerga o novo projeto em algumas operações (403/404); a CLI oficial autenticada foi a alternativa para essas operações. Isso não impediu os deployments ou o smoke do MCP compartilhado.

## Produção e domínio

**Produção executada com autorização; domínio próprio preparado, mas ainda NÃO REGISTRADO/NÃO COMPRADO e sem HTTPS validado.**

O proprietário confirmou a equipe FON e autorizou a inicialização em Production após o bloqueio do primeiro Preview. Quando solicitado o domínio exato, respondeu **“Pode ser criativo e escolher”**. Foi escolhido `meuziwei.com`, sem mudar a marca Astral. A consulta Vercel não disponibilizou `meuziwei.com.br`; informou `meuziwei.com` disponível, por US$ 12,03 de preço base para um ano. A cotação não reserva o nome, pode expirar e pode ter impostos/taxas adicionais. Não se tomou a escolha do nome como autorização de cobrança. O registro cotado não é reembolsável; a renovação automática foi proposta como desativada. Foi solicitada decisão sobre manter o site gratuito ou revisar total/cartão antes do registro.

`meuziwei.com` foi adicionado ao projeto pela API da CLI, exit 0. A associação no projeto aparece como `verified=true`, mas isso não comprova registro, DNS ou certificado: a configuração DNS retorna `misconfigured=true` e a interface mostra **Invalid Configuration**. `NEXT_PUBLIC_SITE_URL` de produção continua em `https://astral-ptbr.vercel.app` para conservar canônicas e sitemap funcionais até a validação do domínio próprio.

Registro exibido pela própria Vercel em **Project Domains → meuziwei.com → DNS Records**, conferido também com `GET /v6/domains/meuziwei.com/config` (exit 0):

| Tipo | Nome no provedor | Valor |
| --- | --- | --- |
| A | @ | 216.198.79.1 |

Não foi inventado CNAME, TXT ou TTL. O provedor deve usar seu TTL padrão se não houver outra exigência; nenhum TTL específico foi informado pela Vercel nessa tela. Evidência sanitizada: `evidencias/dominio-dns.json`.

A revisão automática recusou uma tentativa de preparar também `www.meuziwei.com` com redirect 308 por considerar efeito adicional não autorizado especificamente. Essa parte não foi executada nem repetida por outro meio; a leitura DNS do domínio principal foi separada e concluída. Nenhum `www` ou redirecionamento foi criado.

Pendências reais: decisão/revisão do pagamento, registro do domínio, criação do registro A no provedor e propagação. Somente após DNS e HTTPS válidos, ajustar SITE_URL de produção, reconstruir e conferir domínio, canônicas, sitemap e metadados. Não houve compra, cobrança ou alegação de domínio próprio ativo.
