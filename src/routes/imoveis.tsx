import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState, useEffect, useRef } from "react";
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

// 1. Adicionamos o 'purpose' (comprar/alugar) no schema de validação da URL
const searchSchema = z.object({
  purpose: fallback(z.enum(["comprar", "alugar"]).optional(), undefined),
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
      { title: "Imóveis à venda e locação — Pallaro" },
      {
        name: "description",
        content: "Imóveis na Serra Gaúcha com a curadoria Pallaro Seguros e Imóveis.",
      },
    ],
  }),
  component: ListingPage,
});

// =========================================
// COMPONENTES DE ANIMAÇÃO
// =========================================
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

// =========================================
// PÁGINA PRINCIPAL
// =========================================
function ListingPage() {
  // 2. Extraímos o 'purpose' da URL
  const { purpose, type, city } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filtered = useMemo(
    () =>
      properties.filter((p: any) => {
        // 3. Filtramos pela finalidade (comprar/alugar)
        if (purpose && p.purpose !== purpose) return false;
        if (type && p.type !== type) return false;
        if (city && p.city !== city) return false;
        return true;
      }),
    [purpose, type, city],
  );

  const update = (patch: Record<string, string | undefined>) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) });

  return (
    <div className="container mx-auto px-4 pt-32 pb-10 md:pt-40 font-sans">
      
      <FadeInSection>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Imóveis</h1>
          <p className="mt-1 text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>
        </div>
      </FadeInSection>

      <FadeInSection delay={150}>
        {/* Ajustei o grid para acomodar 3 selects + 1 botão: md:grid-cols-[1fr_1fr_1fr_auto] */}
        <div className="mb-8 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_1fr_1fr_auto] shadow-sm">
          
          {/* Novo Filtro de Finalidade */}
          <Select
            value={purpose ?? "all"}
            onValueChange={(v) => update({ purpose: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="focus:ring-[#d99f2d]"><SelectValue placeholder="Finalidade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Comprar e Alugar</SelectItem>
              <SelectItem value="comprar">Comprar</SelectItem>
              <SelectItem value="alugar">Alugar</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={type ?? "all"}
            onValueChange={(v) => update({ type: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="focus:ring-[#d99f2d]"><SelectValue placeholder="Tipo" /></SelectTrigger>
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
            <SelectTrigger className="focus:ring-[#d99f2d]"><SelectValue placeholder="Cidade" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => navigate({ search: {} })}
            className="hover:text-[#d99f2d] hover:border-[#d99f2d] transition-colors"
          >
            Limpar filtros
          </Button>
        </div>
      </FadeInSection>

      {filtered.length === 0 ? (
        <FadeInSection delay={300}>
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Nenhum imóvel encontrado com os filtros selecionados.
          </div>
        </FadeInSection>
      ) : (
        <div key={`${purpose}-${type}-${city}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, index) => (
            <FadeInCard key={p.id} delay={index * 100}>
              <PropertyCard property={p} />
            </FadeInCard>
          ))}
        </div>
      )}
    </div>
  );
}
