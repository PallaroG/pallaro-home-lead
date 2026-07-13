import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Shield, Award, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      { title: "Pallaro Seguros e Imóveis — Imóveis à venda na Serra Gaúcha" },
      {
        name: "description",
        content:
          "Encontre casas, apartamentos, terrenos e imóveis comerciais à venda em Bento Gonçalves e região com a Pallaro.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const featured = properties.filter((p) => p.featured);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/imoveis",
      search: {
        type: (type || undefined) as
          | "apartamento"
          | "casa"
          | "comercial"
          | "rural"
          | "terreno"
          | undefined,
        city: city || undefined,
      },
    });
  }

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(20,30,55,0.78), rgba(20,30,55,0.88)), url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920')",
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Pallaro Imóveis
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight md:text-6xl">
              O imóvel certo para você na Serra Gaúcha
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Casas, apartamentos, terrenos e imóveis comerciais à venda em Bento Gonçalves e
              região, com a tradição e confiança Pallaro.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mt-12 grid gap-3 rounded-2xl border border-border bg-background p-5 shadow-elevated md:grid-cols-[1fr_1fr_auto]"
          >
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

      <section className="container mx-auto px-4 py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Seleção Pallaro</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
              Imóveis em destaque
            </h2>
            <p className="mt-2 text-muted-foreground">
              Seleção de oportunidades cuidadosamente escolhidas pela nossa equipe.
            </p>
          </div>
          <Link
            to="/imoveis"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline md:inline-flex"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section className="bg-secondary/50 py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Nossos diferenciais
          </p>
          <h2 className="mt-2 text-center text-3xl font-semibold text-foreground md:text-4xl">
            Por que escolher a Pallaro
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Tradição e confiança", text: "Décadas de atuação consolidando relacionamentos no mercado da Serra Gaúcha." },
              { icon: Award, title: "Curadoria de imóveis", text: "Cada imóvel é avaliado pela nossa equipe antes de ser anunciado." },
              { icon: Headphones, title: "Atendimento próximo", text: "Time dedicado para acompanhar você do primeiro contato à assinatura." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-soft transition duration-300 hover:shadow-elevated">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary px-10 py-16 text-center text-primary-foreground shadow-elevated md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Quer vender seu imóvel?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Cadastre seu imóvel e nossa equipe fará a análise e divulgação profissional.
            </p>
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/anunciar-imovel">Anunciar imóvel</Link>
          </Button>
        </div>
      </section>

    </>
  );
}
