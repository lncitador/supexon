import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { Itens } from '@/pages/Itens'
import { Estoque } from '@/pages/Estoque'
import { BOM } from '@/pages/BOM'
import { Compras } from '@/pages/Compras'
import { Producao } from '@/pages/Producao'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/itens" element={<Itens />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/bom" element={<BOM />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/producao" element={<Producao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
