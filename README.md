# OrderFlow API

API REST de pedidos, desenvolvida em TypeScript com Fastify, Zod e SQLite, como projeto final do Geração Tech 4.0 Fullcycle (Projeto B).

## Funcionalidades

- Criar pedidos com um ou mais itens (`POST /orders`).
- Consultar pedidos por ID (`GET /orders/:id`).
- Verificar disponibilidade da API (`GET /health`).
- Calcular subtotal e aplicar desconto por tipo de cliente: `regular` (0%), `vip` (10%) e `employee` (30%).
- Persistir pedidos em SQLite.

## Executar com Docker (recomendado)

Requer Docker e Docker Compose:

```bash
docker compose up --build -d
```

A API ficará em `http://localhost:3000`. Verifique com:

```bash
docker compose ps
docker compose logs --tail=50 api
```

Para encerrar: `docker compose down`. O volume nomeado mantém os dados entre reinícios. **Não** use `docker compose down -v` se quiser preservar os pedidos.

## Executar localmente

Requer Node.js 24 e npm:

```bash
npm ci
cp .env.example .env
npm run dev
```

No PowerShell, substitua `cp` por `Copy-Item .env.example .env`.

## Exemplo de criação de pedido

```bash
curl -X POST http://localhost:3000/orders \
  -H 'Content-Type: application/json' \
  -d '{"customer":"Cliente Exemplo","customerType":"vip","items":[{"product":"Notebook","quantity":2,"unitPrice":100}]}'
```

O subtotal é 200 e o total com desconto VIP é 180. A resposta contém um `id`, que pode ser consultado em `GET /orders/{id}`.

## Qualidade

```bash
npm run build
npm run lint
npm test
npm run test:coverage
```

A configuração do Vitest exige cobertura mínima de **80% em linhas e funções**. A GitHub Actions executa as verificações em push e pull request. Consulte a aba Actions do repositório para o resultado atualizado.

## Arquitetura

O código é organizado em camadas: `domain` (entidades e regras), `application` (casos de uso e contratos), `infrastructure` (SQLite e repositório) e `presentation` (rotas HTTP e validação). O padrão **Strategy** encapsula as diferentes políticas de desconto, evitando que a regra dependa do transporte HTTP.

Veja [ADR-001](docs/adr/001-arquitetura.md), [OpenAPI](docs/openapi.yaml), [desempenho](docs/desempenho.md) e [registro de IA](docs/ia.md).

## Observabilidade

A OrderFlow API utiliza o sistema de logs estruturados do Fastify, baseado no Pino, para registrar requisições e respostas em formato JSON.

### Endpoint de métricas

**GET `/metrics`**

Retorna a quantidade de pedidos criados com sucesso desde a inicialização da aplicação.

Exemplo de resposta:

```json
{
  "orders_created_total": 1
}
```

O contador é incrementado quando `POST /orders` retorna HTTP 201.

**Limitação:** a métrica é mantida em memória e reiniciada quando a aplicação é reiniciada. Ela não representa a quantidade histórica de pedidos armazenados no SQLite.

### Indicadores de desempenho

O projeto também utiliza Grafana k6 para verificar a latência e a taxa de falhas da API.

No smoke test local, com um usuário virtual durante 30 segundos, foram obtidos:

- 6.506 requisições HTTP.
- Latência p95 de 4,57 ms.
- Taxa de falhas HTTP de 0%.
- Todos os thresholds aprovados.

Os detalhes estão em `docs/desempenho.md`.

## Limitações

Este projeto é uma API de demonstração, não um serviço pronto para produção: não implementa autenticação, autorização, migrações de banco robustas ou observabilidade centralizada. O SQLite é adequado à execução local em uma instância, não a múltiplas réplicas gravando no mesmo arquivo.

## Colaboração

Veja [CONTRIBUTORS.md](CONTRIBUTORS.md). Antes de submeter, confirme que as informações de autoria e os resultados de desempenho correspondem ao trabalho realizado.
