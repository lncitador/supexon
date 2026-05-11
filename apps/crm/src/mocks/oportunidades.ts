// TEMPORARY MOCK DATA — placeholder until Tuyau is connected to @supexon/api/registry

export type EtapaOportunidade = 'Prospecção' | 'Qualificação' | 'Proposta' | 'Negociação' | 'Fechado'

export interface Oportunidade {
  id: string
  titulo: string
  clienteId: string
  clienteNome: string
  etapa: EtapaOportunidade
  valorEstimado: number
  dataPrevistaoFechamento: string
  responsavel: string
}

export const mockOportunidades: Oportunidade[] = [
  { id: 'o1', titulo: 'Fornecimento de Equipamentos Linha A', clienteId: 'c1', clienteNome: 'Indústrias Alfa Ltda', etapa: 'Negociação', valorEstimado: 128000, dataPrevistaoFechamento: '2026-05-30', responsavel: 'Beatriz Santos' },
  { id: 'o2', titulo: 'Contrato de Manutenção Anual', clienteId: 'c2', clienteNome: 'Distribuidora Beta S.A.', etapa: 'Proposta', valorEstimado: 48000, dataPrevistaoFechamento: '2026-06-15', responsavel: 'Lucas Martins' },
  { id: 'o3', titulo: 'Implantação de Sistema ERP', clienteId: 'c3', clienteNome: 'Tech Solutions ME', etapa: 'Qualificação', valorEstimado: 75000, dataPrevistaoFechamento: '2026-07-01', responsavel: 'Beatriz Santos' },
  { id: 'o4', titulo: 'Suprimentos para Obra Fase 2', clienteId: 'c4', clienteNome: 'Construtora Gama', etapa: 'Prospecção', valorEstimado: 220000, dataPrevistaoFechamento: '2026-08-20', responsavel: 'Rodrigo Neves' },
  { id: 'o5', titulo: 'Renovação de Contrato Logístico', clienteId: 'c6', clienteNome: 'Logística Épsilon Ltda', etapa: 'Fechado', valorEstimado: 96000, dataPrevistaoFechamento: '2026-05-11', responsavel: 'Lucas Martins' },
  { id: 'o6', titulo: 'Expansão de Linha de Produtos', clienteId: 'c1', clienteNome: 'Indústrias Alfa Ltda', etapa: 'Prospecção', valorEstimado: 54000, dataPrevistaoFechamento: '2026-09-01', responsavel: 'Rodrigo Neves' },
  { id: 'o7', titulo: 'Consultoria de Processos', clienteId: 'c8', clienteNome: 'Serviços Eta Ltda', etapa: 'Qualificação', valorEstimado: 32000, dataPrevistaoFechamento: '2026-06-30', responsavel: 'Beatriz Santos' },
  { id: 'o8', titulo: 'Venda de Equipamentos Varejo', clienteId: 'c7', clienteNome: 'Varejo Zeta ME', etapa: 'Proposta', valorEstimado: 18500, dataPrevistaoFechamento: '2026-06-10', responsavel: 'Lucas Martins' },
]
