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

Somente iniciado após os gates locais. **PROJETO CRIADO E CONECTADO AO GITHUB; nenhuma URL Preview criada ainda.**

- Repositório independente criado e enviado: https://github.com/anjox35-alt/astral-ptbr, branch `ptbr-preview`.
- Commit de implementação validada: `5d18bf9853c0722c04b8b5a397b9ae41fd4f9755`. Histórico raiz independente, sem pais upstream. Motor e licenças comparados contra a branch upstream local: nenhuma diferença.
- Equipe confirmada pelo proprietário: FON (`fon6`). Conta CLI autenticada: `anjox35-9469`.
- Projeto criado: https://vercel.com/fon6/astral-ptbr. ID `prj_q2w1mIszCSE9qcQJxcTcSyUEtVHB`, equipe `team_PNsFnGMY8e31oaVYx6xE0mGj`, framework Next.js, Node 24.x, instalação `npm ci --no-audit --no-fund`, build `npm run build`.
- Criação autenticada pela CLI/API: exit 0; `vercel link --yes --scope fon6 --project astral-ptbr`: exit 0. Inspeção posterior confirmou zero deployments.
- `vercel.json` desativa deploys automáticos por Git; Preview será solicitado explicitamente pela API.
- NEXT_PUBLIC_SITE_URL precisa corresponder à URL real fornecida pela Vercel; não foi inventado domínio ou alias.
- Tentativa anterior pelo conector `create_project`, escopo explícito `fon6`, projeto `astral-ptbr`: Vercel retornou **403 forbidden — You don't have permission to create the project**. Essa tentativa não criou projeto; a CLI autenticada criou o projeto posteriormente.
- Alternativa indicada pelo próprio conector: CLI oficial. Versão consultada no registro npm: 65.10.0. `npx --yes --package=vercel@65.10.0 vercel whoami --scope fon6`: **exit 1, login_required, saved login is not valid or has expired**.
- O login oficial da CLI foi concluído posteriormente pelo proprietário; `vercel whoami --scope fon6` confirmou a conta, e `vercel teams ls` confirmou FON no plano Hobby.
- Solicitação de autorização para login oficial apresentada ao proprietário, porque suas instruções exigem autorização específica para alterar credenciais. Não se solicitou senha/token no chat.
- A criação com `gitRepository` e a primeira conexão por `vercel git connect` falharam por falta de acesso ao repositório. A inspeção no GitHub mostrou que a integração oficial já existia, limitada a outro repositório. Após a escolha explícita do proprietário, `anjox35-alt/astral-ptbr` foi adicionado à seleção, preservando o acesso preexistente e sem selecionar todos os repositórios. `Genuino-Engine/Ar` não foi alterado nem utilizado.
- `vercel git connect https://github.com/anjox35-alt/astral-ptbr --scope fon6 --yes`: exit 0, Connected. Leitura posterior da API confirmou `link.type=github`, `org=anjox35-alt`, `repo=astral-ptbr`, `productionBranch=ptbr-preview` e zero deployments. Deploy automático por Git permanece desativado no código; o próximo deploy será explicitamente Preview.
- CI do código mais recente `f207c020de91aebe3d41b3db2b86ffb70afafb24`: `completed/success`, confirmado por `gh run list` (exit 0), execução https://github.com/anjox35-alt/astral-ptbr/actions/runs/41604856868.
- `vercel deploy --dry --json --environment preview --project astral-ptbr --scope fon6`: exit 0, 55 arquivos, zero caminhos privados/proibidos selecionados, LICENSE e licença pública presentes. Evidência: `evidencias/vercel-source-inspection.json`. Nenhum deploy é criado por esse comando.
- `vercel link` gerou uma variável OIDC local da plataforma; seu valor não foi lido nem registrado. `.env.local` e `.vercel/` foram confirmados como ignorados por Git e excluídos da seleção de deploy.
- Pendência real: configurar a variável com o alias efetivamente retornado pela Vercel, concluir o build remoto e executar os testes públicos. Esses itens ainda NÃO EXECUTADOS.

## Setup global Vercel solicitado

Guia solicitado e lido integralmente: https://vercel.com/get-started.md. A ferramenta web recusou o tipo `text/markdown`; a leitura HTTP direta foi concluída com exit 0.

- CLI global: `npm install --global vercel@latest`, exit 0. `vercel --version`: 65.10.0; `vercel whoami --scope fon6`: autenticado.
- Plugin: `npx --yes plugins add vercel/vercel-plugin --target codex --scope user --yes`, exit 0. `codex plugin list --json` confirmou `vercel@openai-curated-remote`, versão 0.54.1, `installed=true`, `enabled=true`. A instalação foi limitada ao Codex, sem instalar nos outros editores propostos pelo instalador. Não foi instalado o pacote adicional de skills separado.
- MCP compartilhado: `codex mcp add vercel --url https://mcp.vercel.com` adicionou a entrada global. O consentimento OAuth ainda precisa ser concluído; a primeira espera expirou sem callback. Não é reportado como MCP autenticado.
- Configuração: `C:/Users/Anjox/.codex/config.toml`; backup privado em `config.toml.vercel-setup-20261103.backup`, hash conferido e ACLs iguais às do original. Comparação dos demais campos encontrou 128 valores equivalentes, reformatação de TOML e omissão de um array de argumentos vazio; nenhum argumento foi acrescentado e nenhuma outra configuração foi restaurada ou descartada.
- Nenhuma política de aprovação foi afrouxada e nenhum aplicativo ou sessão foi reiniciado. A autorização MCP deve ficar limitada ao projeto novo; os projetos existentes não são alvo desta tarefa.

## Produção e domínio

**NÃO EXECUTADOS.** A fase 4 exige confirmação do proprietário sobre nome definitivo, conta Vercel e domínio exato. Nenhum domínio foi adicionado, comprado ou alterado, e nenhum registro DNS foi presumido. Após confirmação, obter os registros exibidos pela Vercel e validar propagação, HTTPS, sitemap, canonical e metadados no domínio.
