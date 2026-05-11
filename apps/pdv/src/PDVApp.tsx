import { Routes, Route } from 'react-router'
import { AppShell } from '@/layouts/AppShell'
import { Venda } from '@/pages/Venda'
import { Produtos } from '@/pages/Produtos'
import { Clientes } from '@/pages/Clientes'
import { VendasRecentes } from '@/pages/VendasRecentes'
import { Caixa } from '@/pages/Caixa'
import { Configuracoes } from '@/pages/Configuracoes'

export default function PDVApp() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Venda />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="vendas-recentes" element={<VendasRecentes />} />
        <Route path="caixa" element={<Caixa />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  )
}
