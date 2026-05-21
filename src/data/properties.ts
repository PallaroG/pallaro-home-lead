import type { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "casa-jardim-europa",
    title: "Casa moderna no Jardim Europa",
    type: "casa",
    purpose: "venda",
    city: "Bento Gonçalves",
    neighborhood: "Jardim Europa",
    price: 1290000,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpots: 2,
    areaM2: 220,
    description:
      "Casa em condomínio fechado com acabamento de alto padrão, ampla área de lazer, piscina aquecida e churrasqueira gourmet. Próxima a escolas e supermercados.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
    ],
    featured: true,
  },
  {
    id: "apto-centro",
    title: "Apartamento 2 dormitórios no Centro",
    type: "apartamento",
    purpose: "aluguel",
    city: "Bento Gonçalves",
    neighborhood: "Centro",
    price: 2200,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpots: 1,
    areaM2: 75,
    description:
      "Apartamento mobiliado a 2 quadras da Praça Aquiles Lorenzon. Prédio com elevador, portaria e área comum.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    featured: true,
  },
  {
    id: "cobertura-planalto",
    title: "Cobertura duplex no Planalto",
    type: "apartamento",
    purpose: "venda",
    city: "Bento Gonçalves",
    neighborhood: "Planalto",
    price: 1850000,
    bedrooms: 3,
    bathrooms: 4,
    parkingSpots: 3,
    areaM2: 280,
    description:
      "Cobertura duplex com vista panorâmica para os vinhedos, terraço com hidromassagem e churrasqueira privativa.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    featured: true,
  },
  {
    id: "terreno-vinhedos",
    title: "Terreno em condomínio nos Vinhedos",
    type: "terreno",
    purpose: "venda",
    city: "Bento Gonçalves",
    neighborhood: "Vale dos Vinhedos",
    price: 480000,
    bedrooms: 0,
    bathrooms: 0,
    parkingSpots: 0,
    areaM2: 1200,
    description:
      "Terreno plano em condomínio fechado, com vista para vinhedos e infraestrutura completa pronta para construir.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"],
  },
  {
    id: "sala-comercial",
    title: "Sala comercial na Av. Osvaldo Aranha",
    type: "comercial",
    purpose: "aluguel",
    city: "Bento Gonçalves",
    neighborhood: "Cidade Alta",
    price: 3800,
    bedrooms: 0,
    bathrooms: 2,
    parkingSpots: 2,
    areaM2: 110,
    description:
      "Sala comercial em prédio corporativo, recepção, copa e duas vagas de garagem. Pronta para uso.",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"],
  },
  {
    id: "casa-rural",
    title: "Sítio com vinhedos e casa sede",
    type: "rural",
    purpose: "venda",
    city: "Monte Belo do Sul",
    neighborhood: "Linha Leopoldina",
    price: 2750000,
    bedrooms: 4,
    bathrooms: 3,
    parkingSpots: 4,
    areaM2: 35000,
    description:
      "Propriedade rural com 3,5 hectares, vinhedos produtivos, cantina, casa sede restaurada e galpão.",
    images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200"],
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export const cities = Array.from(new Set(properties.map((p) => p.city))).sort();
