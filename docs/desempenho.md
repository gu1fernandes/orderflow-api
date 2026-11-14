# Desempenho e SLO

## Objetivo

Verificar se a criação de pedidos atende a um cenário básico de smoke test local. O teste não representa capacidade máxima nem produção.

## Indicadores

- **Latência:** `http_req_duration`, especialmente p95 (95º percentil).
- **Erros:** `http_req_failed`.
- **SLO proposto para o smoke test:** p95 < 500 ms e taxa de erros < 1%.

## Ambiente

API iniciada com `docker compose up --build -d`, na porta 3000. Banco SQLite em volume Docker. O gerador de carga k6 é executado na máquina host.

## Execução

```bash
k6 run tests/performance/smoke.js
```

## Resultados reais — PREENCHER APÓS EXECUTAR

| Métrica | Resultado medido | Objetivo |
|---|---|---|
| p95 de `http_req_duration` | PENDENTE | < 500 ms |
| Taxa de `http_req_failed` | PENDENTE | < 1% |
| Total de requisições | PENDENTE | Informativo |
| Data/hora do teste | PENDENTE | Informativo |
| Resultado dos thresholds | PENDENTE | Aprovado/Reprovado |

Cole abaixo o resumo gerado pelo k6 ou inclua um arquivo de evidência no repositório. **Não declare o SLO cumprido sem medições.**

## Limitações

O cenário usa 1 usuário virtual durante 30 segundos e testa somente criação de pedidos. Não mede throughput sob concorrência alta, consumo de memória ou recuperação após falhas.
