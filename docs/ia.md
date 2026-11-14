# Registro de Uso de Inteligência Artificial — OrderFlow API

## 1. Identificação

**Projeto:** OrderFlow API
**Responsável:** Guilherme de Souza Fernandes
**Ferramenta utilizada:** ChatGPT — OpenAI
**Período:** novembro de 2026
**Repositório:** https://github.com/gu1fernandes/orderflow-api

## 2. Objetivo do registro

Este documento apresenta como a inteligência artificial foi utilizada durante o desenvolvimento da OrderFlow API, incluindo solicitações feitas pelo desenvolvedor, sugestões recebidas, decisões adotadas, problemas identificados e verificações realizadas.

A ferramenta auxiliou no desenvolvimento e na documentação, mas suas respostas não foram consideradas evidências suficientes de funcionamento. O projeto foi validado por compilação, análise estática, testes automatizados, execução em Docker, requisições HTTP e integração contínua.

## 3. Metodologia de registro

Os registros estão separados em duas categorias:

- **Prompt literal:** mensagem reproduzida conforme enviada pelo desenvolvedor, preservando sua redação.
- **Solicitação recuperada parcialmente:** trecho identificável de uma interação anterior, sem reconstruir artificialmente a mensagem completa.

Também foram registradas interações em que o desenvolvedor apresentou resultados ou erros de ferramentas para que a IA ajudasse na depuração. Essas interações são relevantes porque mostram o processo de revisão, e não apenas a geração inicial do código.

## 4. Registro de prompts e decisões

### Registro 01 — Planejamento inicial do projeto

**Tipo:** solicitação recuperada parcialmente de conversa anterior.

**Trecho do prompt:**

> vamos começar do zero o projeto B

**Contexto:** o desenvolvedor solicitou auxílio para iniciar o Projeto B, seguindo as normas estabelecidas e trabalhando de maneira prática, com comunicação simples e objetiva.

**Sugestão da IA:** organizar a implementação em etapas, começando pela estrutura do projeto e pela API, depois testes, persistência, Docker, CI e documentação.

**Decisão adotada:** desenvolver uma API de pedidos denominada OrderFlow API, utilizando TypeScript, Fastify, Zod e SQLite, com separação de responsabilidades e aplicação do padrão Strategy.

**Verificação:** o projeto foi compilado, testado e executado localmente. Os principais endpoints foram verificados por requisições HTTP.

### Registro 02 — Organização do repositório e commits

**Tipo:** preferência expressa pelo desenvolvedor em conversa anterior.

**Solicitação registrada:** utilizar mensagens de commit em português.

**Sugestão da IA:** manter mensagens descritivas com prefixos de Conventional Commits, como `feat`, `ci`, `chore` e `docs`.

**Decisão adotada:** utilizar mensagens em português, preservando prefixos convencionais.

**Verificação:** histórico de commits publicado no GitHub, incluindo implementação da API, integração contínua, Docker e documentação.

### Registro 03 — Verificação da conteinerização

**Tipo:** prompt literal.

**Mensagem enviada:**

```text
git log -5 --oneline
a77acc9 (HEAD -> main, origin/main) chore: adiciona conteinerizacao da API com Docker Compose
e203c72 ci: configura verificações automáticas de qualidade e testes
1c385cf feat: implementa API de pedidos com arquitetura limpa etestes automatizados github actions esta verde
```

**Sugestão da IA:** confirmar que os commits estavam sincronizados com o repositório remoto e prosseguir para a documentação e as evidências de desempenho.

**Decisão adotada:** manter a configuração de Docker já validada e continuar com os requisitos restantes.

**Verificação:** os commits apareceram na branch `main`. A API já havia sido executada em Docker Compose, com persistência de pedidos confirmada após reinício.

### Registro 04 — Instalação e execução do k6

**Tipo:** prompt literal.

**Mensagem enviada:**

```text
k6 version
k6 : O termo 'k6' não é reconhecido como nome de cmdlet,
função, arquivo de script ou programa operável.
```

**Sugestão da IA:** executar o Grafana k6 utilizando sua imagem Docker, evitando a instalação direta da ferramenta no Windows.

**Decisão adotada:** executar o script de desempenho por meio do contêiner `grafana/k6`, utilizando `host.docker.internal` para acessar a API.

**Verificação:** o teste foi executado com sucesso durante 30 segundos, com 1 usuário virtual.

### Registro 05 — Análise dos resultados de desempenho

**Tipo:** prompt literal, trecho da saída compartilhada pelo desenvolvedor.

**Mensagem enviada:**

```text
http_req_duration
✓ 'p(95)<500' p(95)=4.57ms

http_req_failed
✓ 'rate<0.01' rate=0.00%

http_reqs......................: 6506
checks_succeeded..............: 100.00%
```

**Sugestão da IA:** registrar as medições reais em `docs/desempenho.md`, distinguindo os limites definidos dos resultados observados.

**Decisão adotada:** documentar a latência p95 de 4,57 ms, a taxa de falhas de 0% e as 6.506 requisições executadas.

**Verificação:** ambos os thresholds configurados no k6 foram aprovados. O relatório foi publicado no commit `1b6c3d0`.

**Limitação reconhecida:** o resultado corresponde a um smoke test local com um usuário virtual e não comprova desempenho sob alta concorrência ou em produção.

### Registro 06 — Identificação de pendência na documentação

**Tipo:** prompt literal.

**Mensagem enviada:**

```text
Get-Content docs/desempenho.md
```

O conteúdo apresentado ainda possuía campos `PENDENTE` para p95, taxa de falhas e total de requisições.

**Sugestão da IA:** substituir os campos pendentes pelas métricas efetivamente medidas e corrigir a descrição do ambiente de execução.

**Decisão adotada:** atualizar o relatório com os resultados reais e indicar que o k6 foi executado em Docker.

**Verificação:** a alteração foi registrada no commit `1b6c3d0`, publicado no GitHub.

### Registro 07 — Análise da observabilidade

**Tipo:** prompt literal.

**Mensagem enviada:**

```text
Get-Content src/app.ts
```

O código apresentado incluía:

```typescript
const app = Fastify({ logger: true });
```

**Sugestão da IA:** aproveitar os logs estruturados já habilitados pelo Fastify e implementar uma métrica simples de pedidos criados com sucesso.

**Decisão adotada:** adicionar `GET /metrics`, expondo o contador `orders_created_total`.

**Verificação:** o endpoint retornou inicialmente 0 e passou a retornar 1 após a criação de um pedido com resposta HTTP 201.

**Limitação:** o contador é mantido em memória e reinicia com o processo. Não representa o total histórico de pedidos armazenados no SQLite.

### Registro 08 — Correção de problemas de análise estática

**Tipo:** prompt literal, trecho do resultado compartilhado.

**Mensagem enviada:**

```text
tests/performance/smoke.js
13:17  error  '__ENV' is not defined
30:14  error  '_' is defined but never used
```

**Sugestão da IA:** declarar `__ENV` como variável global fornecida pelo ambiente k6 e remover o parâmetro não utilizado do bloco `catch`.

**Decisão adotada:** adicionar `/* global __ENV */` e utilizar `catch` sem parâmetro.

**Verificação:** o desenvolvedor executou `npm run lint`, que terminou sem erros.

### Registro 09 — Falha no teste de integração da métrica

**Tipo:** prompt literal, trecho do erro apresentado.

**Mensagem enviada:**

```text
SqliteError: no such table: orders

FAIL tests/integration/metrics.test.ts
AssertionError: expected 500 to be 201
```

**Sugestão inicial da IA:** criar a tabela necessária no banco em memória.

**Revisão da sugestão:** após consultar o teste de integração já existente, identificou-se uma solução mais adequada: reutilizar a função `createDatabase(":memory:")`, que prepara o esquema utilizado pela aplicação.

**Decisão adotada:** reutilizar a inicialização oficial do banco, evitando duplicação manual do esquema SQL.

**Verificação:** o teste de métricas passou após a correção.

Este registro demonstra que uma sugestão inicial da IA foi revista com base no código real do projeto.

### Registro 10 — Validação final dos testes

**Tipo:** prompt literal, trecho da saída enviada.

**Mensagem enviada:**

```text
Test Files  3 passed (3)
Tests       10 passed (10)
```

A execução de cobertura também apresentou:

```text
Statements: 95.55%
Branches:   87.87%
Functions:  100%
Lines:      95.55%
```

**Sugestão da IA:** publicar as alterações de observabilidade somente após confirmar build, lint, testes e cobertura.

**Decisão adotada:** executar as verificações locais antes de publicar o código.

**Verificação:** os quatro comandos foram concluídos com sucesso. Posteriormente, o desenvolvedor confirmou que o workflow do commit de métricas ficou verde no GitHub Actions.

### Registro 11 — Investigação de falhas na integração contínua

**Tipo:** prompt literal.

**Mensagem enviada:**

> o da metricas ficou verde so os outros dois q nao

**Contexto:** duas execuções anteriores do GitHub Actions estavam vermelhas, enquanto a execução mais recente, correspondente às alterações de métricas, havia sido aprovada.

**Sugestão da IA:** utilizar como evidência a execução verde correspondente ao código atual, sem tentar alterar retroativamente os resultados de commits anteriores.

**Decisão adotada:** considerar a execução mais recente aprovada como referência para a entrega, preservando o histórico das falhas anteriores.

**Verificação:** confirmação do status verde pelo desenvolvedor na interface do GitHub Actions.

### Registro 12 — Revisão da documentação de uso de IA

**Tipo:** prompts literais.

**Mensagens enviadas:**

> IA em .MD inteiro e me mande para eu copiar e colar.

> Precisa ter prompts que realmente eu usei. Então volte na nossa conversa e veja alguns prompts que eu usei pra usar de referência também.

**Sugestão inicial da IA:** produzir um documento organizado por atividades, decisões e verificações, utilizando resumos representativos das solicitações.

**Problema identificado:** os resumos não reproduziam necessariamente a redação real das mensagens enviadas pelo desenvolvedor.

**Decisão adotada:** revisar o documento e distinguir prompts literais de solicitações recuperadas parcialmente, evitando apresentar paráfrases como transcrições.

**Verificação:** comparação com as mensagens disponíveis no histórico da conversa e com as evidências técnicas compartilhadas durante o desenvolvimento.

## 5. Síntese das decisões adotadas

| Área | Decisão | Evidência |
|---|---|---|
| Arquitetura | Separação em camadas e Strategy | Código-fonte e testes |
| API | Fastify e validação com Zod | Requisições e testes de integração |
| Persistência | SQLite | Criação, consulta e persistência após reinício |
| Qualidade | Vitest, ESLint e cobertura | 10 testes aprovados; 95,55% de cobertura de linhas |
| CI | GitHub Actions | Execução mais recente confirmada como verde |
| Docker | Docker Compose com volume persistente | Execução local e teste de reinício |
| Desempenho | Grafana k6 | p95 de 4,57 ms; 0% de falhas |
| Observabilidade | Logs estruturados e `/metrics` | Teste manual e automatizado |

## 6. Limitações do uso de IA

Durante o desenvolvimento, foram identificadas situações em que as sugestões da IA precisaram ser corrigidas ou complementadas.

Entre elas estão a inicialização incorreta do banco SQLite no primeiro teste de métricas, a necessidade de corrigir o lint do script k6 e a produção inicial de um registro de IA com prompts resumidos em vez de transcrições.

Essas situações reforçam que respostas geradas por IA devem ser verificadas contra o código, os requisitos e os resultados reais.

## 7. Responsabilidade e transparência

O ChatGPT participou como ferramenta de assistência ao desenvolvimento. A ferramenta forneceu sugestões de implementação, comandos, exemplos de código, diagnósticos de erros e textos de documentação.

A execução dos comandos, a observação dos resultados e a confirmação do funcionamento foram realizadas pelo desenvolvedor em seu ambiente.

Os registros deste documento não atribuem à IA autoria independente, nem substituem os testes e evidências técnicas do repositório.

## 8. Evidências e referências

- [Repositório](https://github.com/gu1fernandes/orderflow-api)
- [Histórico de commits](https://github.com/gu1fernandes/orderflow-api/commits/main/)
- [GitHub Actions](https://github.com/gu1fernandes/orderflow-api/actions)
- [ADR de arquitetura](adr/001-arquitetura.md)
- [Especificação OpenAPI](openapi.yaml)
- [Relatório de desempenho](desempenho.md)
- [Script k6](../tests/performance/smoke.js)

---

**Responsável:** Guilherme de Souza Fernandes
**Ferramenta utilizada:** ChatGPT — OpenAI
**Última revisão:** 13 de novembro de 2026