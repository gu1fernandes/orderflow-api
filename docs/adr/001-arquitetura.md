# ADR-001 — API modular com camadas e persistência SQLite

- **Status:** aceita
- **Data:** 2026-11-13

## Contexto

O projeto acadêmico exige um fluxo de negócio completo, testes automatizados, execução reproduzível e decisões arquiteturais justificadas, com tempo de implementação limitado.

## Decisão

Adotar um monólito modular em TypeScript/Node.js 24, Fastify como servidor HTTP, Zod para validar entradas e SQLite para persistência. Organizar o código em quatro áreas: domínio, aplicação, infraestrutura e apresentação. Definir `OrderRepository` como contrato da aplicação, implementado pela infraestrutura. Implementar descontos por Strategy, com políticas separadas para clientes regular, VIP e funcionário.

## Justificativa

O monólito modular reduz custo operacional e permite testes sem rede. A separação entre domínio e infraestrutura facilita substituir o armazenamento e testar casos de uso. Strategy permite adicionar uma política de desconto sem concentrar todas as regras em uma única condição. SQLite dispensa um segundo serviço no Docker Compose, mantendo a persistência demonstrável.

## Consequências e trade-offs

- **Benefícios:** menor complexidade de implantação; regras de domínio testáveis; contrato de repositório; fluxo HTTP completo.
- **Custos:** SQLite limita concorrência e escalabilidade horizontal; abstrações adicionais aumentam a quantidade de arquivos; não há autenticação nem autorização.
- **Alternativas rejeitadas:** microsserviços e PostgreSQL, por ampliarem a complexidade operacional sem necessidade para o escopo mínimo.

## Verificação

Testes unitários das regras de pedido, testes de integração das rotas, CI com build/lint/testes/cobertura e teste manual de criação, consulta e persistência após reiniciar o Docker Compose.
