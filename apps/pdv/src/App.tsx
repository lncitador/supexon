import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { Venda } from '@/pages/Venda'
import { Produtos } from '@/pages/Produtos'
import { Clientes } from '@/pages/Clientes'
import { VendasRecentes } from '@/pages/VendasRecentes'
import { Caixa } from '@/pages/Caixa'
import { Configuracoes } from '@/pages/Configuracoes'

export default function App() {
  return (
    <BrowserRouter basename="/pdv">
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Venda />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/vendas-recentes" element={<VendasRecentes />} />
          <Route path="/caixa" element={<Caixa />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
