import { Routes, Route } from 'react-router'
import { AppShell } from '@/layouts/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { Itens } from '@/pages/Itens'
import { Estoque } from '@/pages/Estoque'
import { BOM } from '@/pages/BOM'
import { Compras } from '@/pages/Compras'
import { Producao } from '@/pages/Producao'

export default function ERPApp() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="itens" element={<Itens />} />
        <Route path="estoque" element={<Estoque />} />
        <Route path="bom" element={<BOM />} />
        <Route path="compras" element={<Compras />} />
        <Route path="producao" element={<Producao />} />
      </Route>
    </Routes>
  )
}
