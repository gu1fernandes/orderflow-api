# Registro de uso de inteligência artificial

## Escopo de uso

Foi utilizada assistência de IA durante a implementação e documentação do projeto para discutir organização de camadas, padrão Strategy, testes automatizados, Docker Compose, GitHub Actions e exemplos de documentação.

## Exemplos de solicitações e sugestões

| Solicitação resumida | Sugestão da IA | Decisão e verificação humana |
|---|---|---|
| Estruturar uma API de pedidos | Separar domínio, aplicação, infraestrutura e rotas | Implementação executada localmente; endpoints testados |
| Implementar descontos extensíveis | Aplicar Strategy para regular, VIP e funcionário | Testes unitários e verificação de pedido VIP de subtotal 200 e total 180 |
| Automatizar verificações | Workflow com `npm ci`, build, lint, testes e cobertura | Execução da GitHub Actions conferida pelo responsável |
| Executar em contêiner | Dockerfile e Docker Compose com volume SQLite | `/health`, POST e GET testados; pedido recuperado após reinício |
| Documentar e medir desempenho | OpenAPI, ADR e script k6 | Documentos devem ser revisados; métricas só serão registradas após execução real |

## Limites e responsabilidade

As respostas da IA foram tratadas como propostas, não como evidência de funcionamento. O responsável revisou comandos e resultados de execução. Houve um exemplo de POST com campos incorretos (`name`/`price` em vez de `product`/`unitPrice`), rejeitado pela validação Zod; o teste foi corrigido para respeitar o contrato real. Não foram inventados resultados de benchmark.

**Revisão antes da entrega:** ajuste esta seção se algum fato não corresponder à participação real da equipe; registre prompts adicionais relevantes e decisões próprias.
