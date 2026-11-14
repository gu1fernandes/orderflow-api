# Desempenho e SLO

## Objetivo

Avaliar a criação de pedidos na OrderFlow API por meio de um smoke test local com Grafana k6.

## Ambiente

- API executada com Docker Compose na porta 3000.
- Banco de dados SQLite com persistência em volume Docker.
- Grafana k6 executado em contêiner Docker.
- Cenário: 1 usuário virtual durante 30 segundos.
- Endpoint: POST /orders.

## Execução

```powershell
docker run --rm -i `
  -v "${PWD}:/scripts" `
  -e BASE_URL=http://host.docker.internal:3000 `
  grafana/k6 run /scripts/tests/performance/smoke.js
Resultados reais
Teste executado em 13/11/2026.
Métrica    Resultado medido
Requisições HTTP    6.506
Vazão média    216,83 req/s
Latência média    4,28 ms
Latência mediana    3,21 ms
Latência p90    4,10 ms
Latência p95    4,57 ms
Latência máxima    890,24 ms
Taxa de falhas HTTP    0,00%
Verificações aprovadas    13.012 de 13.012 (100%)

SLO e thresholds
Indicador    Objetivo    Resultado    Situação
Latência p95    Inferior a 500 ms    4,57 ms    Aprovado
Taxa de falhas    Inferior a 1%    0,00%    Aprovado

Os dois thresholds configurados no script k6 foram atendidos.
Conclusão
A OrderFlow API apresentou baixa latência e nenhuma falha HTTP durante o smoke test realizado.

Os resultados comprovam o atendimento aos limites estabelecidos para esse cenário específico, mas não representam capacidade máxima ou desempenho em produção.
Limitações
O teste utilizou apenas um usuário virtual durante 30 segundos, sem avaliar concorrência elevada, consumo de memória ou recuperação após falhas.
