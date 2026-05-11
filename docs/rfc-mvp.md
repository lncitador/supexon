# RFC MVP - Supexon

Status: vivo  
Responsavel: produto e engenharia  
Escopo: MVP geral do ecossistema Supexon  
Ultima revisao: 2026-05-11

Este RFC e o quadro principal de acompanhamento do MVP. Sempre que uma tarefa for concluida, a caixa correspondente deve mudar de `[ ]` para `[x]` no mesmo commit ou PR que entrega a alteracao.

## Regras de Manutencao

- Toda feature nova do MVP deve entrar neste RFC antes da implementacao.
- Toda entrega deve atualizar as checkboxes relacionadas.
- Nao marcar uma tarefa como concluida sem evidencia no repositorio.
- User stories devem identificar persona, objetivo e valor de negocio.
- Tarefas tecnicas devem ficar abaixo da user story que elas habilitam.
- Se uma feature sair do MVP, mover para "Fora do MVP inicial" em vez de apagar sem historico.
- Este documento nao substitui `docs/database-modeling.md`; ele referencia o escopo funcional do produto.

## Legenda

- `[ ]` Nao iniciado ou nao comprovado no repositorio.
- `[x]` Concluido e comprovado no repositorio.
- `API`: `apps/api`
- `ERP`: `apps/erp`
- `CRM`: `apps/crm`
- `PDV`: `apps/pdv`
- `Portal`: `apps/portal`

## Personas

### P1 - Administrador da Empresa

Responsavel por configurar a empresa, usuarios, permissoes, unidades, locais e dados base. Precisa operar multiplas unidades ou areas com isolamento por tenant.

### P2 - Gestor Operacional

Responsavel por acompanhar estoque, compras, producao, rendimento, movimentacoes e gargalos operacionais.

### P3 - Operador de Producao

Executa atividades produtivas, registra apontamentos, consumo de materiais, saidas, perdas, embalagem e produtividade.

### P4 - Comprador

Gerencia fornecedores, pedidos de compra, recebimentos e entrada de itens/lotes no estoque.

### P5 - Vendedor / Caixa

Opera o PDV, seleciona produtos, clientes, formas de pagamento e finaliza vendas com baixa de estoque.

### P6 - Comercial / CRM

Gerencia clientes, oportunidades, propostas, pipeline e historico comercial.

### P7 - Gestor Financeiro / Administrativo

Acompanha pagamentos, valores de venda, custos, remuneracao variavel e saldos operacionais.

### P8 - Desenvolvedor / Integrador

Mantem a API, contratos type-safe, validacoes, transformacoes, testes e integracoes futuras.

## Objetivos do MVP

- [ ] Entregar um monorepo operavel com API, ERP, CRM, PDV e Portal.
- [ ] Manter type safety ponta a ponta entre API e frontends.
- [ ] Permitir operacao multi-tenant.
- [ ] Permitir cadastro e rastreio de itens, lotes, locais e estoque.
- [ ] Permitir fluxo basico de compras e recebimentos.
- [ ] Permitir fluxo generico de producao, transformacao e embalagem.
- [ ] Permitir gestao basica de clientes e oportunidades.
- [ ] Permitir fluxo basico de venda no PDV.
- [ ] Manter a modelagem generica para diferentes industrias.

## F01 - Fundacao do Monorepo

### User Story F01-US01

Como P8 - Desenvolvedor / Integrador, quero um monorepo padronizado para API, frontends e pacotes compartilhados, para evoluir o ecossistema sem duplicar configuracoes.

- [x] Criar monorepo com `pnpm-workspace.yaml`.
- [x] Criar `apps/api`.
- [x] Criar `apps/example`.
- [x] Criar `apps/erp`.
- [x] Criar `apps/crm`.
- [x] Criar `apps/pdv`.
- [x] Criar `apps/portal`.
- [x] Criar `packages/ui`.
- [x] Criar `packages/shared`.
- [x] Criar `packages/tuyau`.
- [x] Atualizar README para refletir o estado real atual do monorepo.
- [x] Definir scripts raiz para rodar dev/build/typecheck/test por app.

### User Story F01-US02

Como P8 - Desenvolvedor / Integrador, quero um padrao de documentacao vivo, para que decisoes, escopo e progresso do MVP fiquem rastreaveis.

- [x] Criar `docs/database-modeling.md`.
- [x] Criar `docs/rfc-mvp.md`.
- [x] Definir checklist de PR exigindo atualizacao do RFC quando houver mudanca funcional.

## F02 - API Base

### User Story F02-US01

Como P8 - Desenvolvedor / Integrador, quero uma API AdonisJS em modo JSON, para servir os frontends independentes do Supexon.

- [x] Configurar AdonisJS em `apps/api`.
- [x] Configurar rotas tecnicas raiz e health check.
- [x] Configurar autenticação base com signup, login, logout e profile.
- [x] Configurar PostgreSQL no projeto.
- [x] Remover dependencia/runtime SQLite quando nao for mais necessaria.
- [x] Padronizar variaveis `.env.example` para PostgreSQL.
- [x] Garantir `pnpm --filter @supexon/api typecheck`.
- [x] Garantir `pnpm --filter @supexon/api build`.
- [x] Garantir suite minima de testes da API.

### User Story F02-US02

Como P8 - Desenvolvedor / Integrador, quero contratos type-safe da API, para que ERP, CRM e PDV consumam dados sem tipos manuais.

- [x] Manter exports de registry/data da API.
- [x] Criar `packages/tuyau`.
- [x] Configurar cliente Tuyau compartilhado.
- [x] Configurar base URL por ambiente.
- [x] Bloquear uso direto de `fetch`/clientes soltos nos apps quando Tuyau estiver pronto.
- [x] Documentar padrao de consumo de API nos frontends.

## F03 - Identity, Usuarios e Multi-Tenancy

### User Story F03-US01

Como P1 - Administrador da Empresa, quero criar e acessar minha empresa no sistema, para operar dados isolados dos demais tenants.

- [x] Criar migration de `tenants`.
- [x] Criar model `Tenant`.
- [x] Criar transformer `TenantTransformer`.
- [ ] Criar validators de tenant.
- [ ] Criar controllers e rotas de tenant.
- [ ] Criar listagem de tenants acessiveis pelo usuario.
- [ ] Criar selecao de tenant ativo.
- [ ] Persistir tenant ativo por request.

### User Story F03-US02

Como P1 - Administrador da Empresa, quero gerenciar usuarios e papeis dentro do tenant, para controlar acesso operacional.

- [x] Criar migration de `tenant_users`.
- [x] Criar model `TenantUser`.
- [x] Criar transformer `TenantUserTransformer`.
- [ ] Criar validators de membership.
- [ ] Criar controllers e rotas de membros.
- [ ] Implementar roles iniciais: owner, admin, operator, seller, viewer.
- [ ] Adicionar autorizacao por role.
- [ ] Criar testes de isolamento de acesso por tenant.

### User Story F03-US03

Como P8 - Desenvolvedor / Integrador, quero RLS no PostgreSQL, para reforcar o isolamento multi-tenant no banco.

- [ ] Definir estrategia de `app.tenant_id`.
- [ ] Configurar middleware para setar tenant por request.
- [ ] Configurar reset do contexto ao final da request.
- [ ] Criar migrations/policies de RLS.
- [ ] Criar testes provando isolamento entre tenants.

## F04 - Catalogo de Itens

### User Story F04-US01

Como P2 - Gestor Operacional, quero cadastrar itens genericos, para representar materia-prima, produto acabado, servico, kit e submontagem.

- [x] Criar migration de `items`.
- [x] Criar model `Item`.
- [x] Criar transformer `ItemTransformer`.
- [ ] Criar validators de item.
- [ ] Criar controllers e rotas CRUD de item.
- [ ] Implementar unique composto por tenant e SKU.
- [ ] Implementar filtros por tipo, ativo, vendavel, compravel e fabricavel.
- [ ] Integrar ERP com API real de itens.

### User Story F04-US02

Como P5 - Vendedor / Caixa, quero que apenas itens vendaveis aparecam no PDV, para evitar vender materia-prima ou itens internos por engano.

- [x] Modelar `is_sellable`.
- [ ] Criar endpoint de catalogo vendavel.
- [ ] Integrar PDV com catalogo vendavel real.
- [ ] Criar estados de item indisponivel/inativo no PDV.

## F05 - Locais, Lotes e Estoque

### User Story F05-US01

Como P2 - Gestor Operacional, quero gerenciar locais de estoque, para separar lojas, depositos, fabricas, areas de qualidade e perdas.

- [x] Criar migration de `locations`.
- [x] Criar model `Location`.
- [x] Criar transformer `LocationTransformer`.
- [ ] Criar validators de location.
- [ ] Criar controllers e rotas CRUD de locais.
- [ ] Integrar ERP com API real de locais.

### User Story F05-US02

Como P2 - Gestor Operacional, quero rastrear lotes, para saber origem, validade, custo e quantidade disponivel de cada item.

- [x] Criar migration de `stock_lots`.
- [x] Criar model `StockLot`.
- [x] Criar transformer `StockLotTransformer`.
- [ ] Criar validators de lotes.
- [ ] Criar controllers e rotas de lotes.
- [ ] Criar consulta de lote com entradas, transformacoes, saidas e saldo.
- [ ] Integrar ERP com API real de lotes.

### User Story F05-US03

Como P2 - Gestor Operacional, quero ver saldo por item/local, para tomar decisoes rapidas de compra, producao e venda.

- [x] Criar migration de `inventory_balances`.
- [x] Criar model `InventoryBalance`.
- [x] Criar transformer `InventoryBalanceTransformer`.
- [x] Criar migration de `inventory_movements`.
- [x] Criar model `InventoryMovement`.
- [x] Criar transformer `InventoryMovementTransformer`.
- [ ] Criar service transacional de movimentacao de estoque.
- [ ] Criar endpoints de saldo por item/local.
- [ ] Criar endpoints de extrato de movimentacoes.
- [ ] Integrar ERP com API real de estoque.

## F06 - BOM e Estrutura de Produto

### User Story F06-US01

Como P2 - Gestor Operacional, quero definir BOMs, para representar componentes necessarios para produzir, montar ou transformar um item.

- [x] Criar migration de `boms`.
- [x] Criar model `Bom`.
- [x] Criar transformer `BomTransformer`.
- [x] Criar migration de `bom_lines`.
- [x] Criar model `BomLine`.
- [x] Criar transformer `BomLineTransformer`.
- [ ] Criar validators de BOM.
- [ ] Criar controllers e rotas CRUD de BOM.
- [ ] Implementar validacao contra ciclos.
- [ ] Implementar explosao de BOM.
- [ ] Integrar ERP com API real de BOM.

## F07 - Producao, Transformacao e Operacoes

### User Story F07-US01

Como P2 - Gestor Operacional, quero planejar ordens de producao genericas, para controlar transformacoes em diferentes industrias.

- [x] Criar migration de `manufacturing_orders`.
- [x] Criar model `ManufacturingOrder`.
- [x] Criar transformer `ManufacturingOrderTransformer`.
- [ ] Criar validators de ordem de producao.
- [ ] Criar controllers e rotas de ordens.
- [ ] Criar transicao de status: draft, planned, in_progress, completed, cancelled.
- [ ] Integrar ERP com API real de producao.

### User Story F07-US02

Como P3 - Operador de Producao, quero registrar batches de producao com entradas e saidas, para controlar rendimento, perdas, subprodutos e retrabalho.

- [x] Criar migration de `production_batches`.
- [x] Criar model `ProductionBatch`.
- [x] Criar transformer `ProductionBatchTransformer`.
- [x] Criar migration de `production_batch_inputs`.
- [x] Criar model `ProductionBatchInput`.
- [x] Criar transformer `ProductionBatchInputTransformer`.
- [x] Criar migration de `production_batch_outputs`.
- [x] Criar model `ProductionBatchOutput`.
- [x] Criar transformer `ProductionBatchOutputTransformer`.
- [ ] Criar validators de batch/input/output.
- [ ] Criar service de abertura de batch.
- [ ] Criar service de consumo de entradas.
- [ ] Criar service de geracao de saidas.
- [ ] Atualizar estoque transacionalmente ao concluir batch.
- [ ] Criar relatorio de rendimento por batch.

### User Story F07-US03

Como P3 - Operador de Producao, quero apontar atividades, maquinas, tempos e quantidades, para registrar a execucao real da producao.

- [x] Criar migration de `operation_types`.
- [x] Criar model `OperationType`.
- [x] Criar transformer `OperationTypeTransformer`.
- [x] Criar migration de `workstations`.
- [x] Criar model `Workstation`.
- [x] Criar transformer `WorkstationTransformer`.
- [x] Criar migration de `routings`.
- [x] Criar model `Routing`.
- [x] Criar transformer `RoutingTransformer`.
- [x] Criar migration de `routing_operations`.
- [x] Criar model `RoutingOperation`.
- [x] Criar transformer `RoutingOperationTransformer`.
- [x] Criar migration de `operation_entries`.
- [x] Criar model `OperationEntry`.
- [x] Criar transformer `OperationEntryTransformer`.
- [ ] Criar validators de operation types, workstations, routings e apontamentos.
- [ ] Criar controllers e rotas de apontamentos.
- [ ] Criar calculo de duracao e produtividade.
- [ ] Integrar ERP com API real de apontamentos.

## F08 - Colaboradores e Produtividade

### User Story F08-US01

Como P2 - Gestor Operacional, quero cadastrar colaboradores produtivos e seus papeis, para acompanhar producao por pessoa e funcao.

- [x] Criar migration de `workers`.
- [x] Criar model `Worker`.
- [x] Criar transformer `WorkerTransformer`.
- [x] Criar migration de `worker_roles`.
- [x] Criar model `WorkerRole`.
- [x] Criar transformer `WorkerRoleTransformer`.
- [x] Criar migration de `worker_role_assignments`.
- [x] Criar model `WorkerRoleAssignment`.
- [x] Criar transformer `WorkerRoleAssignmentTransformer`.
- [ ] Criar validators de workers e roles.
- [ ] Criar controllers e rotas de workers.
- [ ] Criar consulta de produtividade por colaborador.

### User Story F08-US02

Como P7 - Gestor Financeiro / Administrativo, quero regras de remuneracao variavel por producao, para calcular valores por unidade, kg, peca, hora ou operacao.

- [x] Criar migration de `piece_rate_rules`.
- [x] Criar model `PieceRateRule`.
- [x] Criar transformer `PieceRateRuleTransformer`.
- [x] Criar migration de `worker_production_entries`.
- [x] Criar model `WorkerProductionEntry`.
- [x] Criar transformer `WorkerProductionEntryTransformer`.
- [ ] Criar validators de regras de pagamento.
- [ ] Criar service para selecionar a regra mais especifica.
- [ ] Criar service para gerar lancamentos de produtividade.
- [ ] Criar status pending, approved, paid, cancelled.
- [ ] Criar relatorio de valores por colaborador e periodo.

## F09 - Embalagem e Preparacao Logistica

### User Story F09-US01

Como P3 - Operador de Producao, quero registrar embalagem e agrupamento de itens, para preparar produtos para estocagem, venda ou transferencia.

- [x] Criar migration de `packaging_units`.
- [x] Criar model `PackagingUnit`.
- [x] Criar transformer `PackagingUnitTransformer`.
- [x] Criar migration de `packing_entries`.
- [x] Criar model `PackingEntry`.
- [x] Criar transformer `PackingEntryTransformer`.
- [ ] Criar validators de packaging e packing.
- [ ] Criar controllers e rotas de embalagem.
- [ ] Atualizar estoque/lote quando embalagem gerar unidade vendavel.
- [ ] Integrar ERP com API real de embalagem.

## F10 - Compras e Recebimentos

### User Story F10-US01

Como P4 - Comprador, quero cadastrar fornecedores e pedidos de compra, para controlar aquisicoes e custos.

- [x] Criar migration de `suppliers`.
- [x] Criar model `Supplier`.
- [x] Criar transformer `SupplierTransformer`.
- [x] Criar migration de `purchase_orders`.
- [x] Criar model `PurchaseOrder`.
- [x] Criar transformer `PurchaseOrderTransformer`.
- [x] Criar migration de `purchase_order_lines`.
- [x] Criar model `PurchaseOrderLine`.
- [x] Criar transformer `PurchaseOrderLineTransformer`.
- [ ] Criar validators de fornecedores e pedidos.
- [ ] Criar controllers e rotas de compras.
- [ ] Integrar ERP com API real de compras.

### User Story F10-US02

Como P4 - Comprador, quero receber itens por pedido ou recebimento avulso, para criar lotes e movimentacoes de estoque.

- [x] Criar migration de `purchase_receipts`.
- [x] Criar model `PurchaseReceipt`.
- [x] Criar transformer `PurchaseReceiptTransformer`.
- [x] Criar migration de `purchase_receipt_lines`.
- [x] Criar model `PurchaseReceiptLine`.
- [x] Criar transformer `PurchaseReceiptLineTransformer`.
- [ ] Criar validators de recebimento.
- [ ] Criar service de recebimento com criacao de lote.
- [ ] Criar movimento `purchase_receipt`.
- [ ] Atualizar `inventory_balances`.
- [ ] Criar testes de recebimento transacional.

## F11 - CRM

### User Story F11-US01

Como P6 - Comercial / CRM, quero gerenciar clientes, para manter historico comercial e operacional.

- [x] Criar migration de `customers`.
- [x] Criar model `Customer`.
- [x] Criar transformer `CustomerTransformer`.
- [ ] Criar validators de cliente.
- [ ] Criar controllers e rotas CRUD de clientes.
- [x] Criar app `apps/crm`.
- [x] Criar telas mockadas de clientes.
- [ ] Integrar CRM com API real de clientes.

### User Story F11-US02

Como P6 - Comercial / CRM, quero gerenciar pipeline e oportunidades, para acompanhar vendas futuras.

- [x] Criar migration de `opportunities`.
- [x] Criar model `Opportunity`.
- [x] Criar transformer `OpportunityTransformer`.
- [ ] Criar validators de oportunidades.
- [ ] Criar controllers e rotas de oportunidades.
- [x] Criar telas mockadas de dashboard, pipeline, oportunidades, propostas e historico.
- [ ] Integrar CRM com API real de oportunidades.

## F12 - PDV e Vendas

### User Story F12-US01

Como P5 - Vendedor / Caixa, quero montar uma venda com produtos e cliente, para finalizar atendimento rapidamente.

- [x] Criar migration de `sales`.
- [x] Criar model `Sale`.
- [x] Criar transformer `SaleTransformer`.
- [x] Criar migration de `sale_items`.
- [x] Criar model `SaleItem`.
- [x] Criar transformer `SaleItemTransformer`.
- [x] Criar app `apps/pdv`.
- [x] Criar telas mockadas de venda, produtos, clientes, vendas recentes, caixa e configuracoes.
- [ ] Criar validators de venda.
- [ ] Criar controllers e rotas de venda.
- [ ] Integrar PDV com catalogo real.
- [ ] Implementar carrinho com dados reais.

### User Story F12-US02

Como P5 - Vendedor / Caixa, quero finalizar venda com pagamento, para registrar receita e baixar estoque.

- [x] Criar migration de `payments`.
- [x] Criar model `Payment`.
- [x] Criar transformer `PaymentTransformer`.
- [ ] Criar validators de pagamento.
- [ ] Criar service transacional de finalizacao de venda.
- [ ] Criar movimentos de estoque `sale`.
- [ ] Atualizar `inventory_balances`.
- [ ] Criar estados de pagamento: pending, paid, failed, refunded, cancelled.
- [ ] Criar testes de venda e baixa de estoque.

## F13 - ERP Frontend

### User Story F13-US01

Como P2 - Gestor Operacional, quero uma interface ERP inicial, para navegar por dashboard, itens, estoque, BOM, compras e producao.

- [x] Criar app `apps/erp`.
- [x] Criar layout com sidebar e topbar.
- [x] Criar telas mockadas de dashboard.
- [x] Criar telas mockadas de itens.
- [x] Criar telas mockadas de estoque.
- [x] Criar telas mockadas de BOM.
- [x] Criar telas mockadas de compras.
- [x] Criar telas mockadas de producao.
- [ ] Integrar ERP com API real.
- [ ] Criar estados loading, empty e error.
- [ ] Substituir mocks por Tuyau quando `packages/tuyau` existir.

## F14 - Portal e Navegacao Entre Apps

### User Story F14-US01

Como usuario autenticado, quero acessar ERP, CRM e PDV a partir de um portal, para alternar entre dominios sem perder contexto.

- [x] Criar app `apps/portal`.
- [ ] Criar seletor de app/dominio.
- [ ] Integrar autenticação compartilhada.
- [ ] Integrar tenant ativo compartilhado.
- [ ] Definir navegação entre apps.

## F15 - Shared UI e Design System

### User Story F15-US01

Como P8 - Desenvolvedor / Integrador, quero componentes compartilhados, para manter consistencia visual entre ERP, CRM, PDV e Portal.

- [x] Criar `packages/ui`.
- [ ] Documentar componentes existentes.
- [ ] Criar componentes base para Button, Card, Table, Badge, Input e Dialog.
- [ ] Padronizar tokens visuais.
- [ ] Garantir que ERP, CRM e PDV usem o pacote compartilhado onde fizer sentido.

## F16 - Qualidade, Testes e Build

### User Story F16-US01

Como P8 - Desenvolvedor / Integrador, quero verificacoes automatizadas, para evitar regressao ao evoluir o MVP.

- [ ] Rodar e documentar `pnpm typecheck`.
- [ ] Rodar e documentar `pnpm build`.
- [ ] Rodar e documentar `pnpm test`.
- [ ] Criar testes funcionais de auth.
- [ ] Criar testes funcionais de tenant.
- [ ] Criar testes de estoque transacional.
- [ ] Criar testes de venda transacional.
- [ ] Criar testes de producao/batch transacional.

## F17 - Relatorios MVP

### User Story F17-US01

Como P2 - Gestor Operacional, quero relatorios por lote, para entender origem, consumo, transformacao, perdas, saidas e saldo.

- [ ] Criar consulta consolidada por stock lot.
- [ ] Incluir recebimentos.
- [ ] Incluir consumos de producao.
- [ ] Incluir saidas de producao.
- [ ] Incluir embalagem.
- [ ] Incluir vendas.
- [ ] Exibir saldo final.
- [ ] Integrar relatorio no ERP.

### User Story F17-US02

Como P7 - Gestor Financeiro / Administrativo, quero relatorios de custo e produtividade, para analisar margem e remuneracao variavel.

- [ ] Criar relatorio de custo por batch.
- [ ] Criar relatorio de rendimento por batch.
- [ ] Criar relatorio de produtividade por colaborador.
- [ ] Criar relatorio de valores pendentes/aprovados/pagos.
- [ ] Integrar relatorios no ERP.

## Fora do MVP Inicial

- [ ] Multi-moeda.
- [ ] Fiscal/NF-e.
- [ ] Integracao bancaria.
- [ ] Integracao com balanca.
- [ ] Leitura de codigo de barras.
- [ ] App mobile nativo.
- [ ] BI avancado.
- [ ] Permissoes granulares por recurso.
- [ ] Workflow completo de qualidade.
- [ ] Contas a pagar/receber completo.
