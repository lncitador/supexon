import { BrowserRouter, Routes, Route } from 'react-router'
import { AppShell } from '@/layouts/AppShell'
import { Dashboard } from '@/pages/Dashboard'
import { Clientes } from '@/pages/Clientes'
import { Pipeline } from '@/pages/Pipeline'
import { Oportunidades } from '@/pages/Oportunidades'
import { Propostas } from '@/pages/Propostas'
import { HistoricoVendas } from '@/pages/HistoricoVendas'

export default function App() {
  return (
    <BrowserRouter basename="/crm">
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/oportunidades" element={<Oportunidades />} />
          <Route path="/propostas" element={<Propostas />} />
          <Route path="/historico" element={<HistoricoVendas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
