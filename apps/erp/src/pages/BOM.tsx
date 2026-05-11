import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockBomEntries, type BomEntry } from '@/mocks'
import styles from './Page.module.css'

const columns: Column<BomEntry>[] = [
  { key: 'finishedItemCode', header: 'Produto Acabado' },
  { key: 'finishedItemName', header: 'Nome do Produto' },
  { key: 'componentCode', header: 'Componente' },
  { key: 'componentName', header: 'Nome do Componente' },
  { key: 'quantity', header: 'Qtd.', align: 'right' },
  { key: 'unit', header: 'Un.', align: 'center' },
]

export function BOM() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Lista de Materiais (BOM)</h2>
          <p className={styles.pageDesc}>{mockBomEntries.length} linhas de BOM</p>
        </div>
      </div>
      <DataTable<BomEntry>
        columns={columns}
        rows={mockBomEntries}
        keyField="id"
        emptyMessage="Nenhuma estrutura de produto cadastrada."
      />
    </div>
  )
}
