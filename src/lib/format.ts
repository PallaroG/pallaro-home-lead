export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatArea(m2: number): string {
  return `${m2.toLocaleString("pt-BR")} m²`;
}

export const propertyTypeLabels: Record<string, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
  rural: "Rural",
};

export const purposeLabels: Record<string, string> = {
  venda: "Venda",
};
