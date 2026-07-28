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

// =========================================
// COMPONENTES DE ANIMAÇÃO
// =========================================

// 1. Fade no Scroll (Para o topo e filtros)
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

// 2. Fade Imediato (Para os cards carregarem ao filtrar, sem precisar de scroll)
function FadeInCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Um pequeno timeout garante que a transição do CSS seja aplicada após o elemento ser montado no DOM
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
    <div className="container mx-auto px-4 pt-32 pb-10 md:pt-40">
      
      <FadeInSection>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Imóveis à venda</h1>
          <p className="mt-1 text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>
        </div>
      </FadeInSection>

      <FadeInSection delay={150}>
        <div className="mb-8 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_1fr_auto] shadow-sm">
          <Select
            value={type ?? "all"}
            onValueChange={(v) => update({ type: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="focus:ring-[#C5A880]"><SelectValue placeholder="Tipo" /></SelectTrigger>
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
            <SelectTrigger className="focus:ring-[#C5A880]"><SelectValue placeholder="Cidade" /></SelectTrigger>
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
            className="hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
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
        // A chave `key` abaixo força a re-renderização da grid toda vez que os filtros mudam, 
        // disparando a animação novamente.
        <div key={`${type}-${city}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, index) => (
            // Adicionamos um delay progressivo (index * 100) para criar o efeito "escadinha"
            <FadeInCard key={p.id} delay={index * 100}>
              <PropertyCard property={p} />
            </FadeInCard>
          ))}
        </div>
      )}
    </div>
  );
}
