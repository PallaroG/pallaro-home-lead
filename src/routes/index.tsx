import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Shield, Award, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyCard } from "@/components/property/PropertyCard";
import { properties, cities } from "@/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pallaro Seguros e Imóveis — Imóveis na Serra Gaúcha" },
      {
        name: "description",
        content:
          "Encontre casas, apartamentos, terrenos e imóveis comerciais para venda e aluguel em Bento Gonçalves e região com a Pallaro.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const featured = properties.filter((p) => p.featured);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/imoveis",
      search: {
        purpose: purpose || undefined,
        type: type || undefined,
        city: city || undefined,
      },
    });
  }

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,30,55,0.75), rgba(20,30,55,0.85)), url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920')",
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl text-primary-foreground">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Pallaro Imóveis
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              O imóvel certo para você na Serra Gaúcha
            </h1>
            <p className="mt-4 text-base text-primary-foreground/80 md:text-lg">
              Casas, apartamentos, terrenos e imóveis comerciais em Bento Gonçalves e região,
              com a tradição e confiança Pallaro.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-10 grid gap-3 rounded-xl border border-border bg-background p-4 shadow-xl md:grid-cols-[1fr_1fr_1fr_auto]"
          >
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger><SelectValue placeholder="Finalidade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="venda">Venda</SelectItem>
                <SelectItem value="aluguel">Aluguel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Tipo de imóvel" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Cidade" /></SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" size="lg" className="gap-2">
              <Search className="h-4 w-4" /> Buscar
            </Button>
          </form>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Imóveis em destaque
            </h2>
            <p className="mt-1 text-muted-foreground">
              Seleção de oportunidades cuidadosamente escolhidas pela nossa equipe.
            </p>
          </div>
          <Link
            to="/imoveis"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:inline-flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-secondary/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            Por que escolher a Pallaro
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Tradição e confiança", text: "Décadas de atuação consolidando relacionamentos no mercado da Serra Gaúcha." },
              { icon: Award, title: "Curadoria de imóveis", text: "Cada imóvel é avaliado pela nossa equipe antes de ser anunciado." },
              { icon: Headphones, title: "Atendimento próximo", text: "Time dedicado para acompanhar você do primeiro contato à assinatura." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Quer anunciar seu imóvel?</h2>
            <p className="mt-2 text-primary-foreground/80">
              Cadastre seu imóvel gratuitamente e nossa equipe entrará em contato.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/anunciar">Anunciar agora</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
