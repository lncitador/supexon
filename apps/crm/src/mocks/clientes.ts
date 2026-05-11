// TEMPORARY MOCK DATA — placeholder until Tuyau is connected to @supexon/api/registry

export interface Cliente {
  id: string
  nome: string
  segmento: string
  contato: string
  email: string
  status: 'Ativo' | 'Inativo' | 'Prospect'
  ultimaInteracao: string
}

export const mockClientes: Cliente[] = [
  { id: 'c1', nome: 'Indústrias Alfa Ltda', segmento: 'Manufatura', contato: 'Carlos Mendes', email: 'carlos@alfa.com.br', status: 'Ativo', ultimaInteracao: '2026-05-08' },
  { id: 'c2', nome: 'Distribuidora Beta S.A.', segmento: 'Distribuição', contato: 'Ana Paula Silva', email: 'ana@beta.com.br', status: 'Ativo', ultimaInteracao: '2026-05-05' },
  { id: 'c3', nome: 'Tech Solutions ME', segmento: 'Tecnologia', contato: 'Rafael Costa', email: 'rafael@techsolutions.com', status: 'Prospect', ultimaInteracao: '2026-04-28' },
  { id: 'c4', nome: 'Construtora Gama', segmento: 'Construção', contato: 'Mariana Ferreira', email: 'mariana@gama.com.br', status: 'Ativo', ultimaInteracao: '2026-05-01' },
  { id: 'c5', nome: 'Agro Delta Comércio', segmento: 'Agronegócio', contato: 'Pedro Alves', email: 'pedro@agrodelta.com.br', status: 'Inativo', ultimaInteracao: '2026-03-15' },
  { id: 'c6', nome: 'Logística Épsilon Ltda', segmento: 'Logística', contato: 'Juliana Ramos', email: 'juliana@epsilon.com.br', status: 'Ativo', ultimaInteracao: '2026-05-10' },
  { id: 'c7', nome: 'Varejo Zeta ME', segmento: 'Varejo', contato: 'Thiago Oliveira', email: 'thiago@zeta.com.br', status: 'Prospect', ultimaInteracao: '2026-04-20' },
  { id: 'c8', nome: 'Serviços Eta Ltda', segmento: 'Serviços', contato: 'Fernanda Lima', email: 'fernanda@eta.com.br', status: 'Ativo', ultimaInteracao: '2026-05-07' },
]
