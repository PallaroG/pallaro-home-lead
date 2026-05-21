export const CATEGORIES = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "rural", label: "Rural" },
  { value: "internacional", label: "Internacional / Outros" },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export const SUBTYPES: Record<CategoryValue, { value: string; label: string }[]> = {
  residencial: [
    { value: "apartamento", label: "Apartamento" },
    { value: "casa", label: "Casa" },
    { value: "casa_condominio", label: "Casa em condomínio" },
    { value: "terreno", label: "Terreno/lote" },
    { value: "terreno_condominio", label: "Terreno em condomínio" },
  ],
  comercial: [
    { value: "casa_comercial", label: "Casa Comercial" },
    { value: "predio_comercial", label: "Prédio Comercial" },
    { value: "salas_comerciais", label: "Salas Comerciais" },
    { value: "galpao_comercial", label: "Galpão Comercial" },
    { value: "terreno_comercial", label: "Terreno/lote" },
  ],
  industrial: [
    { value: "galpao_industrial", label: "Galpão Industrial" },
    { value: "centro_logistico", label: "Centro Logístico" },
  ],
  rural: [
    { value: "chacara", label: "Chácara" },
    { value: "sitio", label: "Sítio" },
    { value: "fazenda", label: "Fazenda" },
  ],
  internacional: [{ value: "fora_brasil", label: "Imóveis fora do Brasil" }],
};

export const BRAZIL_STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

export const BROKERS = ["Elio Pallaro", "Equipe Pallaro Imóveis"];

export const PROPERTY_CONDITIONS = [
  { value: "novo", label: "Novo" },
  { value: "usado", label: "Usado" },
  { value: "reformado", label: "Reformado" },
  { value: "precisa_reforma", label: "Precisa de reforma" },
  { value: "em_construcao", label: "Em construção" },
] as const;

export const RENOVATION_STAGES = [
  { value: "nao_aplica", label: "Não se aplica" },
  { value: "iniciada", label: "Iniciada" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "finalizada", label: "Finalizada" },
] as const;

export const CONSTRUCTION_STAGES = [
  { value: "nao_aplica", label: "Não se aplica" },
  { value: "lancamento", label: "Lançamento" },
  { value: "em_construcao", label: "Em construção" },
  { value: "pronto", label: "Pronto para morar" },
] as const;

export const OCCUPATIONS = [
  { value: "desocupado", label: "Desocupado" },
  { value: "proprietario", label: "Ocupado pelo proprietário" },
  { value: "inquilino", label: "Ocupado por inquilino" },
  { value: "negociacao", label: "Em negociação" },
] as const;

export const IPTU_MODES = [
  { value: "mensal", label: "Mensal" },
  { value: "anual", label: "Anual" },
  { value: "isento", label: "Isento" },
] as const;

export const CONDO_MODES = [
  { value: "nao_isento", label: "Não isento" },
  { value: "isento", label: "Isento" },
] as const;

export const KEY_LOCATIONS = [
  { value: "proprietario", label: "Com proprietário" },
  { value: "pallaro", label: "Na Pallaro" },
  { value: "corretor", label: "Com corretor" },
  { value: "portaria", label: "Portaria" },
  { value: "outro", label: "Outro" },
] as const;

export const YES_NO_TBD = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "consultar", label: "A consultar" },
] as const;

export const FEATURE_GROUPS = [
  {
    id: "bem_estar",
    label: "Bem-estar e Comodidade",
    items: [
      "Adega","Ambientes Integrados","Aquário","Aquecedor","Ar condicionado","Arandelas","Armário de Cozinha","Armário Embutido","Armário no Banheiro","Banheira","Box Blindex","Churrasqueira na Sacada","Churrasqueira na Varanda","Closet","Copa","Cozinha Americana","Cozinha Gourmet","Cozinha Grande","Demi-suíte","Escritório","Fechadura Digital","Frente para o mar","Hidromassagem","Home Office","Janela Panorâmica","Jardim de Inverno","Lareira","Lavabo","Lavanderia","Mobiliado","Móveis Planejados","Ofurô","Pé Direito Duplo","Quintal","Sacada","Sacada Fechada com Vidro","Sacada Gourmet","Sala de jantar","Sala Grande","Semimobiliado","Smart Home","Solarium","Varanda","Varanda Fechada com Vidro","Varanda Gourmet","Vista Panorâmica","Vista para a Montanha","Vista para o Lago","Vista para o Mar",
    ],
  },
  {
    id: "seguranca",
    label: "Segurança",
    items: [
      "Alarme","Câmera de Segurança","Cerca","Circuito de Segurança","Guarita","Guarita Blindada","Interfone","Muro de Vidro","Muros e Grades","Portão Eletrônico","Portaria","Portaria 24hs","Ronda 24hs",
    ],
  },
  {
    id: "lazer",
    label: "Lazer e Natureza",
    items: [
      "Academia","Aceita Pet","Área de Lazer","Árvore Frutífera","Arborismo","Bar","Bar na Piscina","Beauty Care","Biblioteca","Campo de Futebol","Campo de Golfe","Centro de Estética","Children Care","Churrasqueira","Churrasqueira a Carvão","Churrasqueira a Gás","Churrasqueira Ecológica","Cinema","Deck","Deck Molhado","Espaço Crossfit","Espaço Fitness","Espaço Gourmet","Espaço Pet","Espaço Teen","Espaço Verde/Parque","Espaço Yoga","Espaço Zen","Horta","Jacuzzi","Jardim","Lago","Mini Quadra","Minimercado","Muro de Escalada","Orquidário","Piscina","Piscina Climatizada","Piscina Coberta","Piscina Infantil","Piscina Olímpica","Piscina para Adulto","Piscina Privativa","Piscina Semiolímpica","Pista de Cooper","Pista de Skate","Playground","Pomar","Praça","Pub","Quadra de Beach Tennis","Quadra de Futebol","Quadra de Futevôlei","Quadra de Squash","Quadra de Tênis","Quadra de Vôlei de Praia","Quadra Poliesportiva","Sala de Massagem","Salão de Festas","Salão de Jogos","Sauna","Spa","Surf Indoor",
    ],
  },
  {
    id: "infraestrutura",
    label: "Infraestrutura",
    items: [
      "Acessibilidade","Área de Serviço","Balaústre","Bicicletário","Canil","Carregador de Carro Elétrico","Chuveiro a Gás","Coffee Shop","Coleta Seletiva de Lixo","Condomínio Inteligente","Condomínio Sustentável","Coworking","Dependência Empregada","Depósito","Despensa","Edícula","Elevador","Elevador de Emergência","Energia Solar","Esquina","Estacionamento Visitantes","Forno de Pizza","Garagem","Garagem Coberta","Garagem Coletiva","Garagem Demarcada","Gás Encanado","Gerador","Guarda Volumes","Hall de Entrada","Heliponto","Isolamento Acústico","Isolamento Térmico","Louceiro","Manobrista","Marina","Mini Golf","Pista de Atletismo","Pista de Pouso","Rampas","Sala de Reunião","Salão de Convenção","TV a Cabo","Vestiário","Wi-Fi",
    ],
  },
  {
    id: "acabamento",
    label: "Acabamento",
    items: [
      "Carpete","Cerâmica","Cimento Queimado","Drywall","Gesso","Granito","Janela de Alumínio","Laje","Mármore","Papel de Parede","Piso de Madeira","Piso Elevado","Piso Laminado","Piso Vinílico","Platibanda","Porcelanato","Sanca","Teto rebaixado",
    ],
  },
] as const;

export const STEPS = [
  { id: 1, title: "Dados principais", short: "Dados" },
  { id: 2, title: "Características", short: "Características" },
  { id: 3, title: "Informações detalhadas", short: "Detalhes" },
  { id: 4, title: "Proprietário, chaves e negociação", short: "Proprietário" },
  { id: 5, title: "Transação e contrato", short: "Contrato" },
  { id: 6, title: "Revisão e envio", short: "Revisão" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];
