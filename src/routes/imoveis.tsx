import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { properties, cities } from "@/data/properties";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  type: fallback(
    z.enum(["casa", "apartamento", "terreno", "comercial", "rural"]).optional(),
    undefined,
  ),
  city: fallback(z.string().optional(), undefined),
});

export const Route = createFileRoute("/imoveis")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Imóveis à venda — Pallaro" },
      {
        name: "description",
        content: "Imóveis à venda na Serra Gaúcha com a curadoria Pallaro Seguros e Imóveis.",
      },
    ],
  }),
  component: ListingPage,
});

function ListingPage() {
  const { type, city } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(
    () =>
      properties.filter((p) => {
        if (type && p.type !== type) return false;
        if (city && p.city !== city) return false;
        return true;
      }),
    [type, city],
  );

  const update = (patch: Record<string, string | undefined>) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Imóveis à venda</h1>
        <p className="mt-1 text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_1fr_auto]">
        <Select
          value={type ?? "all"}
          onValueChange={(v) => update({ type: v === "all" ? undefined : v })}
        >
          <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="casa">Casa</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="terreno">Terreno</SelectItem>
            <SelectItem value="comercial">Comercial</SelectItem>
            <SelectItem value="rural">Rural</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={city ?? "all"}
          onValueChange={(v) => update({ city: v === "all" ? undefined : v })}
        >
          <SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as cidades</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => navigate({ search: {} })}>
          Limpar filtros
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Nenhum imóvel encontrado com os filtros selecionados.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
