export function Configuracoes() {
  return (
    <>
      <div>
        <h1 className="text-display-md font-black text-zinc-950 tracking-tight">Configurações</h1>
        <p className="text-sm text-zinc-500 mt-1">Configurações gerais do ponto de venda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Loja</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Nome da Loja</label>
              <input
                type="text"
                defaultValue="Loja Principal"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">CNPJ</label>
              <input
                type="text"
                defaultValue="12.345.678/0001-99"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Endereço</label>
              <input
                type="text"
                defaultValue="Rua das Flores, 100 — São Paulo, SP"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Operador</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Nome do Operador</label>
              <input
                type="text"
                defaultValue="João Operador"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Perfil de Acesso</label>
              <input
                type="text"
                defaultValue="Operador de Caixa"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Impressora Fiscal</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Modelo</label>
              <input
                type="text"
                defaultValue="Epson TM-T20X"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Porta</label>
              <input
                type="text"
                defaultValue="USB001"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span className="text-xs text-zinc-500">Impressora conectada</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-sm shadow-sm p-6 space-y-4">
          <h2 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Pagamento</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Formas Aceitas</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {['Dinheiro', 'Débito', 'Crédito', 'PIX'].map((m) => (
                  <span
                    key={m}
                    className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-sm text-zinc-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Chave PIX</label>
              <input
                type="text"
                defaultValue="12.345.678/0001-99"
                readOnly
                className="w-full px-3 py-2 text-sm border border-zinc-200 rounded-sm bg-zinc-50 text-zinc-700 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-amber-500 text-[18px] mt-0.5">info</span>
        <p className="text-xs text-amber-700">
          As configurações são somente leitura nesta versão. A edição será habilitada após a integração com a API.
        </p>
      </div>
    </>
  )
}
