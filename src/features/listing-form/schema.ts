import { z } from "zod";

const nonEmpty = (msg: string) => z.string().trim().min(1, msg).max(500);

export const ownerSchema = z.object({
  name: nonEmpty("Informe o nome do proprietário"),
  document: nonEmpty("Informe CPF ou CNPJ"),
  phone: nonEmpty("Informe o telefone"),
  email: z.string().trim().email("E-mail inválido").max(200),
  percentage: z.coerce.number().min(0).max(100),
  notes: z.string().max(1000).optional().default(""),
});

export const captadorSchema = z.object({
  name: nonEmpty("Informe o nome do captador"),
  phone: nonEmpty("Informe o telefone"),
  notes: z.string().max(500).optional().default(""),
});

export const listingSchema = z.object({
  // Step 1
  category: z.enum(["residencial", "comercial", "industrial", "rural", "internacional"], {
    message: "Selecione a categoria",
  }),
  subtype: nonEmpty("Selecione o tipo do imóvel"),
  title: nonEmpty("Informe o título do anúncio").max(120),
  price: z.coerce.number().positive("Informe um valor de venda válido"),
  state: z.string().length(2, "UF inválida"),
  city: nonEmpty("Informe a cidade").max(80),
  neighborhood: nonEmpty("Informe o bairro").max(80),
  address: nonEmpty("Informe o endereço").max(200),
  number: nonEmpty("Informe o número").max(20),
  complement: z.string().max(80).optional().default(""),
  areaTotal: z.coerce.number().positive("Informe a área total"),
  areaBuilt: z.coerce.number().min(0).optional().default(0),
  bedrooms: z.coerce.number().int().min(0),
  suites: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  parkingSpots: z.coerce.number().int().min(0),
  description: nonEmpty("Descreva o imóvel").min(20, "Descreva com pelo menos 20 caracteres").max(4000),
  imageNames: z.array(z.string()).default([]),

  // Step 2
  features: z.record(z.string(), z.boolean()).default({}),

  // Step 3
  condition: z.enum(["novo", "usado", "reformado", "precisa_reforma", "em_construcao"]),
  renovationStage: z.enum(["nao_aplica", "iniciada", "em_andamento", "finalizada"]).default("nao_aplica"),
  constructionStage: z.enum(["nao_aplica", "lancamento", "em_construcao", "pronto"]).default("nao_aplica"),
  occupation: z.enum(["desocupado", "proprietario", "inquilino", "negociacao"]),
  iptuMode: z.enum(["mensal", "anual", "isento"]),
  iptuValue: z.coerce.number().min(0).default(0),
  condoMode: z.enum(["nao_isento", "isento"]),
  condoValue: z.coerce.number().min(0).default(0),

  // Step 4
  owners: z.array(ownerSchema).min(1, "Adicione ao menos um proprietário"),
  keyAvailable: z.enum(["sim", "nao", "combinar"]),
  keyLocation: z.enum(["proprietario", "pallaro", "corretor", "portaria", "outro"]),
  keyNotes: z.string().max(500).optional().default(""),
  captadores: z.array(captadorSchema).default([]),
  responsibleBroker: nonEmpty("Selecione o corretor responsável"),
  authorized: z.enum(["sim", "nao", "analise"]),
  contractStart: z.string().optional().default(""),
  contractDays: z.coerce.number().int().min(0).default(0),

  // Step 5
  announcedPrice: z.coerce.number().positive("Informe o valor de venda anunciado"),
  minimumPrice: z.coerce.number().min(0).default(0),
  commission: z.coerce.number().min(0).max(100).default(6),
  negotiationNotes: z.string().max(2000).optional().default(""),
  acceptsFinancing: z.enum(["sim", "nao", "consultar"]),
  acceptsExchange: z.enum(["sim", "nao", "consultar"]),
  contractType: z.enum(["exclusividade", "nao_exclusividade"]),
  agreeTerms: z.literal(true, { message: "É necessário aceitar os termos" }),
  agreeTruth: z.literal(true, { message: "Confirme a veracidade das informações" }),
  agreeReview: z.literal(true, { message: "Confirme o entendimento sobre a análise" }),
  signatureName: nonEmpty("Informe seu nome completo para assinatura").max(120),
  signatureDocument: nonEmpty("Informe seu CPF/CNPJ").max(40),
  signed: z.literal(true, { message: "Assine a autorização para continuar" }),
});

export type ListingFormValues = z.input<typeof listingSchema>;
export type ListingFormParsed = z.output<typeof listingSchema>;

export const STEP_FIELDS: Record<number, (keyof ListingFormValues)[]> = {
  1: [
    "category","subtype","title","price","state","city","neighborhood","address","number","complement","areaTotal","areaBuilt","bedrooms","suites","bathrooms","parkingSpots","description",
  ],
  2: ["features"],
  3: ["condition","renovationStage","constructionStage","occupation","iptuMode","iptuValue","condoMode","condoValue"],
  4: ["owners","keyAvailable","keyLocation","keyNotes","captadores","responsibleBroker","authorized","contractStart","contractDays"],
  5: ["announcedPrice","minimumPrice","commission","negotiationNotes","acceptsFinancing","acceptsExchange","contractType","agreeTerms","agreeTruth","agreeReview","signatureName","signatureDocument","signed"],
  6: [],
};
