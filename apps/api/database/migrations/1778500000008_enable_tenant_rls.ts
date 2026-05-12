import { BaseSchema } from '@adonisjs/lucid/schema'

const TENANT_OWNED_TABLES = [
  'items',
  'locations',
  'stock_lots',
  'inventory_balances',
  'inventory_movements',
  'boms',
  'bom_lines',
  'worker_roles',
  'workers',
  'workstations',
  'worker_role_assignments',
  'operation_types',
  'routings',
  'routing_operations',
  'manufacturing_orders',
  'production_batches',
  'production_batch_inputs',
  'production_batch_outputs',
  'operation_entries',
  'piece_rate_rules',
  'worker_production_entries',
  'packaging_units',
  'packing_entries',
  'suppliers',
  'purchase_orders',
  'purchase_order_lines',
  'purchase_receipts',
  'purchase_receipt_lines',
  'customers',
  'opportunities',
  'sales',
  'sale_items',
  'payments',
] as const

function policyName(table: string) {
  return `${table}_tenant_isolation`
}

export default class extends BaseSchema {
  async up() {
    for (const table of TENANT_OWNED_TABLES) {
      await this.db.rawQuery(`alter table "${table}" enable row level security`)
      await this.db.rawQuery(`alter table "${table}" force row level security`)
      await this.db.rawQuery(`
        create policy "${policyName(table)}" on "${table}"
        using (tenant_id = nullif(current_setting('app.tenant_id', true), '')::integer)
        with check (tenant_id = nullif(current_setting('app.tenant_id', true), '')::integer)
      `)
    }
  }

  async down() {
    for (const table of [...TENANT_OWNED_TABLES].reverse()) {
      await this.db.rawQuery(`drop policy if exists "${policyName(table)}" on "${table}"`)
      await this.db.rawQuery(`alter table "${table}" no force row level security`)
      await this.db.rawQuery(`alter table "${table}" disable row level security`)
    }
  }
}
