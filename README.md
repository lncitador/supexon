# Supexon

Supexon sera um ecossistema multi-tenant de gestao para operacoes comerciais, estoque, vendas e relacionamento com clientes. O MVP sera construido em um monorepo com `pnpm workspaces`, backend centralizado em AdonisJS 7 no modo API e tres frontends independentes: ERP, PDV e CRM.

O objetivo inicial e validar a base arquitetural do produto com contratos type-safe de ponta a ponta, usando Tuyau como camada oficial de integracao entre a API e os frontends.

## Arquitetura

O sistema sera organizado como um monorepo:

```txt
supexon/
  apps/
    api/
      app/
        controllers/
        models/
        services/
        validators/
        transformers/
      config/
      database/
        migrations/
        schema.ts
        schema_rules.ts
      start/
        routes.ts
      package.json

    erp/
      src/
      package.json

    pdv/
      src/
      package.json

    crm/
      src/
      package.json

  packages/
    shared/
      src/
      package.json

    tuyau/
      src/
      package.json

  package.json
  pnpm-workspace.yaml
  turbo.json
  README.md
```

O workspace devera incluir aplicacoes e pacotes compartilhados:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

## Stack

- Monorepo: `pnpm workspaces` e Turborepo.
- Backend: AdonisJS 7, TypeScript, Lucid ORM e VineJS.
- Banco de dados: PostgreSQL.
- Frontends: apps independentes no estilo Replit, planejados para React, Vite e TypeScript.
- Type safety: Tuyau para cliente tipado compartilhado entre ERP, PDV e CRM.
- Pacotes internos:
  - `packages/shared`: tipos globais, constantes e contratos que nao dependem das rotas da API.
  - `packages/tuyau`: cliente gerado/configurado do Tuyau para consumo dos frontends.

## Aplicacoes

### API (`apps/api`)

Backend centralizado do ecossistema. Ele sera responsavel por autenticacao, isolamento multi-tenant, regras de dominio, persistencia, validacao, transformacao de respostas e exposicao dos contratos type-safe para os frontends.

Regras obrigatorias:

- Usar AdonisJS 7 em modo API.
- Usar PostgreSQL como banco oficial.
- Usar VineJS para toda validacao de entrada.
- Criar rotas nomeadas com `.as('nome.da.rota')`.
- Retornar respostas limpas por Transformers.
- Nao expor Models diretamente aos frontends.
- Nao editar `database/schema.ts` manualmente; ele deve continuar sendo gerado pelo fluxo do Adonis/Lucid apos migrations.

### ERP (`apps/erp`)

Aplicacao principal da operacao. O MVP do ERP deve focar em:

- Cadastro e manutencao de produtos.
- Gestao de itens, unidades e status.
- Criacao e consulta de Bill of Materials (BOM).
- Visualizacao de estoque por local.
- Registro e consulta de movimentacoes de estoque.
- Base para fluxo futuro de compras.

### PDV (`apps/pdv`)

Aplicacao de ponto de venda com foco em velocidade operacional.

O MVP do PDV deve focar em:

- Busca e selecao rapida de produtos.
- Carrinho de venda.
- Selecao de local fisico.
- Finalizacao de venda.
- Baixa imediata de estoque no backend.
- Registro de pagamentos.

### CRM (`apps/crm`)

Aplicacao para relacionamento comercial e acompanhamento de clientes.

O MVP do CRM deve focar em:

- Cadastro e consulta de clientes.
- Historico de vendas por cliente.
- Pipeline simples de oportunidades.
- Base para propostas e pedidos.

## Type Safety com Tuyau

O backend sera a fonte oficial dos contratos da API. Os frontends nao devem criar tipos manuais para payloads ou respostas de rotas.

Fluxo planejado:

1. As rotas da API sao criadas no AdonisJS com nomes explicitos usando `.as(...)`.
2. Os controllers validam entradas com `request.validateUsing(...)` e VineJS.
3. As respostas sao formatadas por Transformers.
4. O Tuyau extrai os tipos do backend.
5. `packages/tuyau` exporta um cliente tipado.
6. ERP, PDV e CRM consomem a API exclusivamente via `@supexon/tuyau`.

Exemplo conceitual:

```ts
import { api } from '@supexon/tuyau'

const products = await api.erp.products.index()
```

Regra: se um frontend precisar chamar a API, deve usar o cliente do Tuyau. Chamadas soltas com `fetch`, `axios` direto ou tipos `any` nao fazem parte da arquitetura do MVP.

## Banco de Dados

O banco oficial sera PostgreSQL. No ambiente local e no Replit, a API deve receber a configuracao por variaveis de ambiente.

Variaveis esperadas:

```env
DB_CONNECTION=postgres
PG_HOST=localhost
PG_PORT=5432
PG_USER=supexon
PG_PASSWORD=supexon
PG_DB_NAME=supexon_dev
```

Em producao, os valores devem apontar para o servico PostgreSQL provisionado para o ambiente.

## Modelo Inicial de Dados

Todas as entidades operacionais devem carregar `tenant_id` para garantir isolamento multi-tenant.

### Multi-tenancy e Usuarios

```txt
tenants
  id
  name
  slug
  status
  created_at
  updated_at

users
  id
  name
  email
  password
  created_at
  updated_at

tenant_memberships
  id
  tenant_id
  user_id
  role
  created_at
  updated_at
```

### Produtos e BOM

```txt
products
  id
  tenant_id
  sku
  name
  description
  unit
  is_active
  created_at
  updated_at

bill_of_materials
  id
  tenant_id
  product_id
  version
  is_active
  created_at
  updated_at

bill_of_material_items
  id
  tenant_id
  bill_of_material_id
  component_product_id
  quantity
  unit
  created_at
  updated_at
```

### Estoque

```txt
locations
  id
  tenant_id
  name
  type
  is_active
  created_at
  updated_at

inventory_balances
  id
  tenant_id
  product_id
  location_id
  quantity_on_hand
  quantity_reserved
  created_at
  updated_at

inventory_movements
  id
  tenant_id
  product_id
  location_id
  type
  quantity
  reference_type
  reference_id
  occurred_at
  created_at
  updated_at
```

### Clientes e CRM

```txt
customers
  id
  tenant_id
  name
  document
  email
  phone
  status
  created_at
  updated_at

opportunities
  id
  tenant_id
  customer_id
  title
  stage
  expected_value
  expected_close_date
  created_at
  updated_at
```

### Vendas e PDV

```txt
sales
  id
  tenant_id
  customer_id
  location_id
  status
  subtotal
  discount_total
  total
  sold_at
  created_at
  updated_at

sale_items
  id
  tenant_id
  sale_id
  product_id
  quantity
  unit_price
  total
  created_at
  updated_at

payments
  id
  tenant_id
  sale_id
  method
  amount
  status
  created_at
  updated_at
```

## Fluxo de Desenvolvimento

Comandos planejados para a raiz do monorepo:

```bash
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm typecheck
pnpm lint
```

Comandos planejados para a API:

```bash
pnpm --filter @supexon/api dev
pnpm --filter @supexon/api build
pnpm --filter @supexon/api test
pnpm --filter @supexon/api typecheck
pnpm --filter @supexon/api exec node ace migration:run
pnpm --filter @supexon/api exec node ace list:routes
```

Comandos planejados para os frontends:

```bash
pnpm --filter @supexon/erp dev
pnpm --filter @supexon/pdv dev
pnpm --filter @supexon/crm dev
```

## Ordem de Implementacao do MVP

1. Reorganizar o monorepo para `apps/api`, `apps/erp`, `apps/pdv`, `apps/crm`, `packages/shared` e `packages/tuyau`.
2. Configurar PostgreSQL no AdonisJS.
3. Configurar Tuyau como contrato oficial entre API e frontends.
4. Implementar base multi-tenant: tenants, usuarios e memberships.
5. Implementar produtos e locais de estoque.
6. Implementar saldos e movimentacoes de estoque.
7. Implementar clientes e historico comercial.
8. Implementar vendas, itens de venda e pagamentos.
9. Implementar telas iniciais do ERP.
10. Implementar fluxo inicial do PDV.
11. Implementar telas iniciais do CRM.
12. Rodar typecheck, testes e build do monorepo.

## Decisoes Arquiteturais

- O MVP sera API-first, sem Inertia.js.
- Cada dominio visual tera seu proprio frontend.
- A API central sera a unica fonte de verdade de regras de negocio.
- PostgreSQL sera o banco oficial desde o inicio.
- Tuyau sera obrigatorio para type safety entre backend e frontends.
- Transformers serao obrigatorios para respostas publicas da API.
- VineJS sera obrigatorio para entrada de dados.
- O schema gerado do Adonis/Lucid nao deve ser editado manualmente.

