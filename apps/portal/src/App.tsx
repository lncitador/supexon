import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router'

const ERPApp = lazy(() => import('@supexon/erp'))
const CRMApp = lazy(() => import('@supexon/crm'))
const PDVApp = lazy(() => import('@supexon/pdv'))

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Carregando</p>
      </div>
    </div>
  )
}

function Landing() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen flex flex-col">
      <header className="border-b border-zinc-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black tracking-tighter uppercase text-zinc-950">Supexon</h1>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 mt-0.5">Plataforma Operacional</p>
        </div>
        <div className="text-xs text-zinc-400 font-medium">v1.0.0</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Selecione o módulo</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">Bem-vindo ao Supexon</h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-sm mx-auto">Escolha o sistema que deseja acessar.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link
            to="/erp"
            className="group flex flex-col bg-white border border-zinc-200 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all p-8 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="bg-zinc-100 p-3 rounded group-hover:bg-zinc-950 transition-colors">
                <span className="material-symbols-outlined text-zinc-950 group-hover:text-white transition-colors" style={{ fontSize: 28 }}>factory</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2 py-1 rounded">ERP</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-zinc-950 mb-1">ERP</h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Gestão de itens, estoque, BOM, ordens de produção e compras.</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-950">
              <span>Abrir ERP</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </Link>

          <Link
            to="/crm"
            className="group flex flex-col bg-white border border-zinc-200 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all p-8 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="bg-zinc-100 p-3 rounded group-hover:bg-zinc-950 transition-colors">
                <span className="material-symbols-outlined text-zinc-950 group-hover:text-white transition-colors" style={{ fontSize: 28 }}>groups</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2 py-1 rounded">CRM</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-zinc-950 mb-1">CRM</h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Clientes, pipeline de vendas, oportunidades, propostas e histórico.</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-950">
              <span>Abrir CRM</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </Link>

          <Link
            to="/pdv"
            className="group flex flex-col bg-white border border-zinc-200 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all p-8 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="bg-zinc-100 p-3 rounded group-hover:bg-zinc-950 transition-colors">
                <span className="material-symbols-outlined text-zinc-950 group-hover:text-white transition-colors" style={{ fontSize: 28 }}>point_of_sale</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-2 py-1 rounded">PDV</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-zinc-950 mb-1">PDV</h3>
            <p className="text-sm text-zinc-500 mb-6 leading-relaxed">Ponto de venda, carrinho, caixa, clientes e vendas recentes.</p>
            <div className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zinc-950">
              <span>Abrir PDV</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-100 px-8 py-4 text-center text-[11px] text-zinc-400 font-medium tracking-wide uppercase">
        Supexon &mdash; Sistema Operacional Integrado
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/erp/*"
          element={
            <Suspense fallback={<Loading />}>
              <ERPApp />
            </Suspense>
          }
        />
        <Route
          path="/crm/*"
          element={
            <Suspense fallback={<Loading />}>
              <CRMApp />
            </Suspense>
          }
        />
        <Route
          path="/pdv/*"
          element={
            <Suspense fallback={<Loading />}>
              <PDVApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
