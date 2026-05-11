# Modelagem do Banco - Supexon

Este documento define a modelagem inicial do banco de dados do Supexon como um sistema novo para um ecossistema com ERP, PDV e CRM.

O objetivo deste documento e orientar a criacao das migrations futuras. Ele nao substitui o `database/schema.ts` gerado pelo Adonis/Lucid, que nunca deve ser editado manualmente.

## Decisoes Base

- Banco oficial: PostgreSQL.
- Arquitetura: monorepo com backend API-first em AdonisJS 7.
- Multi-tenancy obrigatorio desde a primeira migration.
- Toda tabela operacional deve ter `tenant_id`.
- `tenant_id` deve ser `not null` nas tabelas tenant-scoped.
- Usar Row Level Security (RLS) no PostgreSQL como defesa em profundidade.
- Usar VineJS para validar entradas na API.
- Usar Transformers para respostas publicas da API.
- Usar Tuyau para contratos type-safe entre backend e frontends.
- Quantidades, custos e valores monetarios devem usar `decimal`, nao `float`.
- Codigos de negocio como `sku` devem ser unicos por tenant, nao globais.

## Escopo do Supexon

A modelagem precisa tratar ERP, PDV e CRM como dominios de primeira classe desde o inicio.

Ajustes principais:

- Trocar `products` por `items`, porque `items` cobre melhor materia-prima, submontagem, produto acabado e itens vendaveis.
- Criar `locations` para lojas, depositos, fabricas e areas internas.
- Manter `stock_lots` para rastreabilidade.
- Adicionar `inventory_balances` para leitura rapida de saldo por item/local.
- Adicionar `inventory_movements` como razao de movimentacoes de estoque.
- Adicionar clientes, oportunidades, vendas e pagamentos.
- Melhorar compras com fornecedores e recebimentos.
- Tornar `tenant_id` direto e obrigatorio nas tabelas filhas para simplificar RLS, indices e queries.

## Convencoes

### IDs e Timestamps

Todas as tabelas devem ter:

```txt
id
created_at
updated_at
```

Tabelas operacionais devem ter:

```txt
tenant_id
```

### Multi-tenancy

Regra padrao:

```txt
tenant_id references tenants.id on delete restrict not null
```

As tabelas de identidade global, como `users`, nao precisam de `tenant_id`. A relacao entre usuario e empresa deve passar por `tenant_users`.

### Uniques Por Tenant

Evitar unique global em codigos de negocio. Exemplos:

```txt
unique (tenant_id, sku)
unique (tenant_id, slug)
unique (tenant_id, document)
```

### Valores Decimais

Padrao recomendado:

```txt
quantity: decimal(14, 4)
unit_cost: decimal(14, 4)
unit_price: decimal(14, 4)
money totals: decimal(14, 2)
```

## Dominios

## 1. Identity e Tenants

### tenants

Representa uma empresa, filial, loja, fabrica ou unidade organizacional.

```txt
tenants
  id
  parent_id nullable references tenants.id
  name
  slug
  is_active
  created_at
  updated_at
```

Indices e constraints:

```txt
unique (slug)
index (parent_id)
```

Observacao: `slug` pode continuar globalmente unico porque identifica o tenant no sistema inteiro.

### users

Representa usuarios globais da plataforma.

```txt
users
  id
  name nullable
  email
  password
  created_at
  updated_at
```

Indices e constraints:

```txt
unique (email)
```

### tenant_users

Relaciona usuarios com tenants e define papel dentro da empresa.

```txt
tenant_users
  id
  tenant_id references tenants.id
  user_id references users.id
  role
  created_at
  updated_at
```

Roles iniciais:

```txt
owner
admin
operator
seller
viewer
```

Indices e constraints:

```txt
unique (tenant_id, user_id)
index (user_id)
```

## 2. Catalogo e Itens

### items

Entidade central para produtos, materias-primas, submontagens e itens vendaveis.

```txt
items
  id
  tenant_id references tenants.id
  sku
  name
  description nullable
  type
  uom
  reorder_point
  standard_cost
  is_sellable
  is_purchasable
  is_manufacturable
  is_active
  created_at
  updated_at
```

Tipos iniciais:

```txt
raw_material
subassembly
finished_good
service
kit
```

Indices e constraints:

```txt
unique (tenant_id, sku)
index (tenant_id, type)
index (tenant_id, is_active)
```

Notas:

- `is_sellable` controla se aparece no PDV.
- `is_purchasable` controla se pode entrar em compras.
- `is_manufacturable` controla se pode ter BOM/roteiro/ordem de producao.
- `type`, `uom`, `reorder_point` e `standard_cost` fazem parte do cadastro inicial porque conectam catalogo, estoque, compras e producao.

## 3. Locais e Estoque

### locations

Representa locais fisicos ou logicos de estoque.

```txt
locations
  id
  tenant_id references tenants.id
  name
  code
  type
  is_active
  created_at
  updated_at
```

Tipos iniciais:

```txt
store
warehouse
factory
work_in_process
quality_hold
scrap
```

Indices e constraints:

```txt
unique (tenant_id, code)
index (tenant_id, type)
```

### stock_lots

Representa rastreabilidade real do estoque por lote.

```txt
stock_lots
  id
  tenant_id references tenants.id
  item_id references items.id
  location_id references locations.id
  lot_number
  quantity_initial
  quantity_available
  unit_cost
  expiry_date nullable
  status
  created_at
  updated_at
```

Status iniciais:

```txt
available
reserved
consumed
on_hold
rejected
expired
```

Indices e constraints:

```txt
unique (tenant_id, lot_number)
index (tenant_id, item_id)
index (tenant_id, location_id)
index (tenant_id, status)
```

Notas:

- `location_id` deve existir desde o inicio para suportar lojas, depositos, fabricas e areas internas.

### inventory_balances

Tabela de leitura rapida para saldo por item/local.

```txt
inventory_balances
  id
  tenant_id references tenants.id
  item_id references items.id
  location_id references locations.id
  quantity_on_hand
  quantity_reserved
  created_at
  updated_at
```

Indices e constraints:

```txt
unique (tenant_id, item_id, location_id)
index (tenant_id, location_id)
```

Notas:

- Esta tabela e derivada das movimentacoes e lotes.
- Deve ser atualizada dentro das mesmas transacoes que movimentam estoque.

### inventory_movements

Razao de todas as movimentacoes de estoque.

```txt
inventory_movements
  id
  tenant_id references tenants.id
  item_id references items.id
  location_id references locations.id
  stock_lot_id nullable references stock_lots.id
  type
  quantity
  unit_cost nullable
  reference_type nullable
  reference_id nullable
  occurred_at
  created_at
  updated_at
```

Tipos iniciais:

```txt
purchase_receipt
sale
manufacturing_consume
manufacturing_output
adjustment
transfer_in
transfer_out
quality_hold
scrap
```

Indices:

```txt
index (tenant_id, item_id)
index (tenant_id, location_id)
index (tenant_id, stock_lot_id)
index (tenant_id, reference_type, reference_id)
index (tenant_id, occurred_at)
```

## 4. BOM e Producao

### boms

Ficha tecnica de um item fabricavel.

```txt
boms
  id
  tenant_id references tenants.id
  item_id references items.id
  version
  is_active
  created_at
  updated_at
```

Indices e constraints:

```txt
unique (tenant_id, item_id, version)
index (tenant_id, is_active)
```

### bom_lines

Componentes de uma BOM.

```txt
bom_lines
  id
  tenant_id references tenants.id
  bom_id references boms.id
  component_item_id references items.id
  quantity
  uom
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, bom_id)
index (tenant_id, component_item_id)
```

Nota: `tenant_id` direto evita depender de join com `boms` para RLS.

### workstations

Postos de trabalho ou recursos produtivos.

```txt
workstations
  id
  tenant_id references tenants.id
  name
  hourly_rate
  is_active
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, is_active)
```

### routings

Roteiro de fabricacao de um item.

```txt
routings
  id
  tenant_id references tenants.id
  item_id references items.id
  name
  is_active
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, item_id)
index (tenant_id, is_active)
```

### routing_operations

Operacoes sequenciais de um roteiro.

```txt
routing_operations
  id
  tenant_id references tenants.id
  routing_id references routings.id
  workstation_id references workstations.id
  sequence
  setup_time
  cycle_time
  created_at
  updated_at
```

Indices e constraints:

```txt
unique (tenant_id, routing_id, sequence)
index (tenant_id, workstation_id)
```

### manufacturing_orders

Ordem de producao.

```txt
manufacturing_orders
  id
  tenant_id references tenants.id
  item_id references items.id
  routing_id nullable references routings.id
  quantity
  status
  start_date nullable
  due_date nullable
  created_at
  updated_at
```

Status iniciais:

```txt
draft
planned
in_progress
completed
cancelled
```

Indices:

```txt
index (tenant_id, status)
index (tenant_id, item_id)
index (tenant_id, due_date)
```

### mo_materials

Materiais planejados e consumidos por ordem de producao.

```txt
mo_materials
  id
  tenant_id references tenants.id
  manufacturing_order_id references manufacturing_orders.id
  item_id references items.id
  stock_lot_id nullable references stock_lots.id
  required_quantity
  consumed_quantity
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, manufacturing_order_id)
index (tenant_id, item_id)
index (tenant_id, stock_lot_id)
```

### mo_outputs

Saidas produzidas pela ordem de producao.

```txt
mo_outputs
  id
  tenant_id references tenants.id
  manufacturing_order_id references manufacturing_orders.id
  item_id references items.id
  stock_lot_id nullable references stock_lots.id
  quantity
  type
  created_at
  updated_at
```

Tipos iniciais:

```txt
finished_good
scrap
rework
```

Indices:

```txt
index (tenant_id, manufacturing_order_id)
index (tenant_id, item_id)
index (tenant_id, stock_lot_id)
```

## 5. Compras

### suppliers

Fornecedores.

```txt
suppliers
  id
  tenant_id references tenants.id
  name
  document nullable
  email nullable
  phone nullable
  status
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, status)
unique (tenant_id, document) nullable
```

### purchase_orders

Ordens de compra.

```txt
purchase_orders
  id
  tenant_id references tenants.id
  supplier_id nullable references suppliers.id
  supplier_name
  status
  ordered_at nullable
  expected_at nullable
  created_at
  updated_at
```

Status iniciais:

```txt
draft
sent
partially_received
received
cancelled
```

Indices:

```txt
index (tenant_id, status)
index (tenant_id, supplier_id)
```

### purchase_order_lines

Linhas da ordem de compra.

```txt
purchase_order_lines
  id
  tenant_id references tenants.id
  purchase_order_id references purchase_orders.id
  item_id references items.id
  quantity
  unit_price
  expected_date nullable
  received_quantity
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, purchase_order_id)
index (tenant_id, item_id)
```

### purchase_receipts

Recebimentos de compra.

```txt
purchase_receipts
  id
  tenant_id references tenants.id
  purchase_order_id references purchase_orders.id
  location_id references locations.id
  received_at
  created_at
  updated_at
```

### purchase_receipt_lines

Linhas recebidas. Cada linha deve gerar ou atualizar lote e movimentacao.

```txt
purchase_receipt_lines
  id
  tenant_id references tenants.id
  purchase_receipt_id references purchase_receipts.id
  purchase_order_line_id nullable references purchase_order_lines.id
  item_id references items.id
  stock_lot_id references stock_lots.id
  quantity
  unit_cost
  created_at
  updated_at
```

## 6. CRM

### customers

Clientes.

```txt
customers
  id
  tenant_id references tenants.id
  name
  document nullable
  email nullable
  phone nullable
  status
  created_at
  updated_at
```

Status iniciais:

```txt
lead
active
inactive
blocked
```

Indices:

```txt
index (tenant_id, status)
unique (tenant_id, document) nullable
```

### opportunities

Pipeline comercial simples.

```txt
opportunities
  id
  tenant_id references tenants.id
  customer_id references customers.id
  title
  stage
  expected_value
  expected_close_date nullable
  created_at
  updated_at
```

Stages iniciais:

```txt
new
qualified
proposal
won
lost
```

Indices:

```txt
index (tenant_id, customer_id)
index (tenant_id, stage)
```

## 7. PDV e Vendas

### sales

Venda feita pelo PDV ou pedido confirmado.

```txt
sales
  id
  tenant_id references tenants.id
  customer_id nullable references customers.id
  location_id references locations.id
  status
  subtotal
  discount_total
  total
  sold_at nullable
  created_at
  updated_at
```

Status iniciais:

```txt
draft
completed
cancelled
refunded
```

Indices:

```txt
index (tenant_id, status)
index (tenant_id, customer_id)
index (tenant_id, location_id)
index (tenant_id, sold_at)
```

### sale_items

Itens vendidos.

```txt
sale_items
  id
  tenant_id references tenants.id
  sale_id references sales.id
  item_id references items.id
  stock_lot_id nullable references stock_lots.id
  quantity
  unit_price
  discount_total
  total
  created_at
  updated_at
```

Indices:

```txt
index (tenant_id, sale_id)
index (tenant_id, item_id)
index (tenant_id, stock_lot_id)
```

### payments

Pagamentos vinculados a venda.

```txt
payments
  id
  tenant_id references tenants.id
  sale_id references sales.id
  method
  amount
  status
  paid_at nullable
  created_at
  updated_at
```

Metodos iniciais:

```txt
cash
credit_card
debit_card
pix
store_credit
other
```

Status iniciais:

```txt
pending
paid
failed
refunded
cancelled
```

Indices:

```txt
index (tenant_id, sale_id)
index (tenant_id, status)
```

## RLS

O Supexon deve usar RLS nas tabelas tenant-scoped.

Politica padrao para tabelas com `tenant_id` direto:

```sql
CREATE POLICY tenant_isolation ON table_name
  USING (tenant_id = current_setting('app.tenant_id', true)::int)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::int);
```

Diretrizes:

- `users` nao deve usar RLS por `tenant_id`, porque e entidade global.
- `tenant_users` pode usar uma politica especifica baseada nos tenants do usuario ou ser acessada por fluxos controlados de autenticacao.
- Tabelas filhas devem ter `tenant_id` direto para evitar politicas baseadas em joins complexos.
- A API deve setar `app.tenant_id` por request antes de executar queries.
- O pool PostgreSQL deve inicializar conexoes com `app.tenant_id = 0`.
- O middleware deve limpar/resetar o contexto ao final da request.

## Ordem Recomendada de Migrations

1. `users`
2. `tenants`
3. `tenant_users`
4. `items`
5. `locations`
6. `stock_lots`
7. `inventory_balances`
8. `inventory_movements`
9. `boms`
10. `bom_lines`
11. `workstations`
12. `routings`
13. `routing_operations`
14. `manufacturing_orders`
15. `mo_materials`
16. `mo_outputs`
17. `suppliers`
18. `purchase_orders`
19. `purchase_order_lines`
20. `purchase_receipts`
21. `purchase_receipt_lines`
22. `customers`
23. `opportunities`
24. `sales`
25. `sale_items`
26. `payments`
27. RLS policies

## Fases de Entrega

### Fase 1: Fundacao

- `users`
- `tenants`
- `tenant_users`
- autenticacao
- selecao de tenant ativo
- RLS base

### Fase 2: ERP Basico

- `items`
- `locations`
- `stock_lots`
- `inventory_balances`
- `inventory_movements`
- `boms`
- `bom_lines`

### Fase 3: Producao

- `workstations`
- `routings`
- `routing_operations`
- `manufacturing_orders`
- `mo_materials`
- `mo_outputs`

### Fase 4: Compras

- `suppliers`
- `purchase_orders`
- `purchase_order_lines`
- `purchase_receipts`
- `purchase_receipt_lines`

### Fase 5: CRM

- `customers`
- `opportunities`

### Fase 6: PDV

- `sales`
- `sale_items`
- `payments`
- baixa imediata de estoque
- atualizacao transacional de saldos

## Perguntas Em Aberto

- O Supexon precisa suportar multiplas moedas no MVP?
- O PDV tera caixa/sessao de caixa ja no MVP?
- Clientes e fornecedores podem ser a mesma entidade juridica no futuro?
- Lotes serao obrigatorios para todos os itens ou configuraveis por item?
- O CRM precisa de propostas antes de vendas ou vendas podem nascer direto do PDV no MVP?

## Decisao Atual

A modelagem inicial parte das necessidades do Supexon:

- `items` como entidade central, nao `products`.
- `tenant_id` obrigatorio em todas as tabelas operacionais.
- `locations` desde o inicio.
- `stock_lots` mais `inventory_balances` mais `inventory_movements`.
- CRM e PDV como dominios de primeira classe, nao extensoes futuras improvisadas.
