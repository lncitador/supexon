// TEMPORARY MOCK DATA — placeholder until Tuyau is connected to @supexon/api/registry

export interface HistoricoVenda {
  id: string
  clienteId: string
  clienteNome: string
  produtoServico: string
  valor: number
  dataFechamento: string
  responsavel: string
}

export const mockHistoricoVendas: HistoricoVenda[] = [
  { id: 'hv1', clienteId: 'c6', clienteNome: 'Logística Épsilon Ltda', produtoServico: 'Contrato Logístico Anual', valor: 96000, dataFechamento: '2026-05-11', responsavel: 'Lucas Martins' },
  { id: 'hv2', clienteId: 'c1', clienteNome: 'Indústrias Alfa Ltda', produtoServico: 'Equipamentos Linha B', valor: 84500, dataFechamento: '2026-04-15', responsavel: 'Beatriz Santos' },
  { id: 'hv3', clienteId: 'c4', clienteNome: 'Construtora Gama', produtoServico: 'Suprimentos Obra Fase 1', valor: 175000, dataFechamento: '2026-03-28', responsavel: 'Rodrigo Neves' },
  { id: 'hv4', clienteId: 'c2', clienteNome: 'Distribuidora Beta S.A.', produtoServico: 'Sistema de Gestão v1', valor: 42000, dataFechamento: '2026-02-20', responsavel: 'Lucas Martins' },
  { id: 'hv5', clienteId: 'c8', clienteNome: 'Serviços Eta Ltda', produtoServico: 'Consultoria Processos Q4', valor: 28000, dataFechamento: '2025-12-10', responsavel: 'Beatriz Santos' },
  { id: 'hv6', clienteId: 'c3', clienteNome: 'Tech Solutions ME', produtoServico: 'Licenças de Software', valor: 15000, dataFechamento: '2025-11-05', responsavel: 'Rodrigo Neves' },
]
