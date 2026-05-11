import { DataTable, type Column } from '@/components/ui/DataTable'
import { mockItems, type Item } from '@/mocks'
import styles from './Page.module.css'

const columns: Column<Item>[] = [
  { key: 'code', header: 'Código' },
  { key: 'name', header: 'Nome' },
  { key: 'unit', header: 'Unidade', align: 'center' },
  { key: 'category', header: 'Categoria' },
]

export function Itens() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Cadastro de Itens</h2>
          <p className={styles.pageDesc}>{mockItems.length} itens cadastrados</p>
        </div>
      </div>
      <DataTable<Item>
        columns={columns}
        rows={mockItems}
        keyField="id"
        emptyMessage="Nenhum item cadastrado."
      />
    </div>
  )
}
