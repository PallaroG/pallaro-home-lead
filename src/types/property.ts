export type PropertyPurpose = "venda" | "aluguel";
export type PropertyType = "casa" | "apartamento" | "terreno" | "comercial" | "rural";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  city: string;
  neighborhood: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  areaM2: number;
  description: string;
  images: string[];
  featured?: boolean;
}

export interface PropertySubmission {
  id: string;
  createdAt: string;
  property: {
    title: string;
    type: PropertyType;
    purpose: PropertyPurpose;
    address: string;
    city: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpots: number;
    areaM2: number;
    description: string;
  };
  owner: {
    name: string;
    email: string;
    phone: string;
  };
}
