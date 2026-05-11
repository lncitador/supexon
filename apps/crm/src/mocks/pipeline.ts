// TEMPORARY MOCK DATA — placeholder until Tuyau is connected to @supexon/api/registry

import type { EtapaOportunidade } from './oportunidades'

export interface PipelineStage {
  id: EtapaOportunidade
  label: string
  color: string
}

export const pipelineStages: PipelineStage[] = [
  { id: 'Prospecção', label: 'Prospecção', color: 'bg-zinc-100 text-zinc-700' },
  { id: 'Qualificação', label: 'Qualificação', color: 'bg-blue-100 text-blue-700' },
  { id: 'Proposta', label: 'Proposta', color: 'bg-amber-100 text-amber-700' },
  { id: 'Negociação', label: 'Negociação', color: 'bg-orange-100 text-orange-700' },
  { id: 'Fechado', label: 'Fechado', color: 'bg-teal-100 text-teal-700' },
]
