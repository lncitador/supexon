// TEMPORARY MOCK DATA — placeholder until Tuyau is connected to @supexon/api/registry

export type StatusProposta = 'Rascunho' | 'Enviada' | 'Aceita' | 'Recusada'

export interface Proposta {
  id: string
  numero: string
  clienteId: string
  clienteNome: string
  valor: number
  status: StatusProposta
  dataCriacao: string
  oportunidadeId: string
}

export const mockPropostas: Proposta[] = [
  { id: 'p1', numero: 'PROP-2026-001', clienteId: 'c1', clienteNome: 'Indústrias Alfa Ltda', valor: 128000, status: 'Enviada', dataCriacao: '2026-05-02', oportunidadeId: 'o1' },
  { id: 'p2', numero: 'PROP-2026-002', clienteId: 'c2', clienteNome: 'Distribuidora Beta S.A.', valor: 48000, status: 'Rascunho', dataCriacao: '2026-05-06', oportunidadeId: 'o2' },
  { id: 'p3', numero: 'PROP-2026-003', clienteId: 'c6', clienteNome: 'Logística Épsilon Ltda', valor: 96000, status: 'Aceita', dataCriacao: '2026-04-25', oportunidadeId: 'o5' },
  { id: 'p4', numero: 'PROP-2026-004', clienteId: 'c7', clienteNome: 'Varejo Zeta ME', valor: 18500, status: 'Enviada', dataCriacao: '2026-05-08', oportunidadeId: 'o8' },
  { id: 'p5', numero: 'PROP-2026-005', clienteId: 'c5', clienteNome: 'Agro Delta Comércio', valor: 62000, status: 'Recusada', dataCriacao: '2026-03-10', oportunidadeId: 'o6' },
  { id: 'p6', numero: 'PROP-2026-006', clienteId: 'c8', clienteNome: 'Serviços Eta Ltda', valor: 32000, status: 'Rascunho', dataCriacao: '2026-05-09', oportunidadeId: 'o7' },
]
