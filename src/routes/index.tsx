import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Shield, Award, Headphones, ArrowRight, Home, Building } from "lucide-react";
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
      { title: "Pallaro Seguros e Imóveis" },
      {
        name: "description",
        content: "Seu próximo imóvel começa aqui. Comprar, vender ou investir com segurança.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  // Estado para controlar a aba ativa (Comprar, Alugar, Comercial)
  const [activeTab, setActiveTab] = useState("comprar");
  
  const [type, setType] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const featured = properties.filter((p) => p.featured);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/imoveis",
      search: {
        type: (type || undefined) as any,
        city: city || undefined,
      },
    });
  }

  return (
    <>
      {/* =========================================
          1. HERO SECTION (Fundo, Textos e Botões)
          ========================================= */}
      <section id="inicio" className="relative isolate pt-36 pb-48 md:pt-48 md:pb-64 overflow-hidden">
        {/* Imagem de Fundo Escurecida e com Degradê */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11, 21, 40, 0.95) 0%, rgba(11, 21, 40, 0.5) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')",
          }}
        />
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <h1 className="font-serif text-5xl font-semibold leading-tight md:text-7xl">
              Seu próximo <br/>
              <span className="text-[#C5A880]">imóvel</span> começa aqui.
            </h1>
            <h2 className="mt-6 text-xl font-medium md:text-2xl text-white/90">
              Comprar, vender ou investir com segurança e atendimento personalizado.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg max-w-2xl">
              A Pallaro Imóveis une experiência, transparência e consultoria para ajudar você a encontrar o imóvel ideal ou vender seu patrimônio com tranquilidade.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#C5A880] text-[#0B1528] font-bold hover:bg-[#b0946d] px-8 py-6 text-lg transition-all rounded-sm">
                Encontrar imóveis
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent transition-all rounded-sm">
                <Link to="/anunciar-imovel">Avaliar meu imóvel</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. CAIXA DE BUSCA FLUTUANTE
          ========================================= */}
      <section className="container mx-auto px-4 -mt-28 relative z-10 mb-20">
        <div className="bg-[#0B1528] rounded-md shadow-2xl border border-white/10 overflow-hidden">
          
          {/* Abas Superiores */}
          <div className="flex border-b border-white/10 bg-[#0B1528]/50">
            <button 
              onClick={() => setActiveTab("comprar")}
              className={`px-6 md:px-8 py-4 text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "comprar" ? "text-[#C5A880] border-b-2 border-[#C5A880] bg-white/5" : "text-white/60 hover:text-white"}`}
            >
              <Home className="h-4 w-4" /> Comprar
            </button>
            <button 
              onClick={() => setActiveTab("alugar")}
              className={`px-6 md:px-8 py-4 text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "alugar" ? "text-[#C5A880] border-b-2 border-[#C5A880] bg-white/5" : "text-white/60 hover:text-white"}`}
            >
              <Home className="h-4 w-4" /> Alugar
            </button>
            <button 
              onClick={() => setActiveTab("comercial")}
              className={`px-6 md:px-8 py-4 text-sm font-semibold flex items-center gap-2 transition-colors ${activeTab === "comercial" ? "text-[#C5A880] border-b-2 border-[#C5A880] bg-white/5" : "text-white/60 hover:text-white"}`}
            >
              <Building className="h-4 w-4" /> Comercial
            </button>
          </div>

          {/* Formulário de Filtros */}
          <form onSubmit={handleSearch} className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 items-end">
            
            {/* O que você procura? */}
            <div className="col-span-1 md:col-span-3 lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input 
                  placeholder="O que você procura?" 
                  className="pl-10 bg-white border-0 text-black h-12 rounded-sm focus-visible:ring-[#C5A880]" 
                />
              </div>
            </div>

            {/* Cidade */}
            <div className="col-span-1 lg:col-span-2">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-white border-0 text-black h-12 rounded-sm focus:ring-[#C5A880]">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bairro (Placeholder por enquanto) */}
            <div className="col-span-1 lg:col-span-2">
              <Select>
                <SelectTrigger className="bg-white border-0 text-black h-12 rounded-sm focus:ring-[#C5A880]">
                  <SelectValue placeholder="Bairro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="jardins">Jardins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de imóvel */}
            <div className="col-span-1 lg:col-span-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white border-0 text-black h-12 rounded-sm focus:ring-[#C5A880]">
                  <SelectValue placeholder="Tipo de imóvel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Faixa de Valor */}
            <div className="col-span-1 lg:col-span-2">
              <Select>
                <SelectTrigger className="bg-white border-0 text-black h-12 rounded-sm focus:ring-[#C5A880]">
                  <SelectValue placeholder="Faixa de valor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-500k">Até R$ 500.000</SelectItem>
                  <SelectItem value="500k-1m">R$ 500.000 a R$ 1.000.000</SelectItem>
                  <SelectItem value="acima-1m">Acima de R$ 1.000.000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botão Buscar */}
            <Button 
              type="submit" 
              className="bg-[#C5A880] text-[#0B1528] font-bold hover:bg-[#b0946d] h-12 w-full col-span-1 md:col-span-3 lg:col-span-1 transition-colors rounded-sm"
            >
              Buscar
            </Button>

          </form>
        </div>
      </section>

      {/* =========================================
          RESTANTE DA PÁGINA (Para não quebrar)
          ========================================= */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">Seleção Pallaro</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0B1528] md:text-4xl font-serif">
              Imóveis em destaque
            </h2>
            <p className="mt-2 text-gray-600">
              Seleção de oportunidades cuidadosamente escolhidas pela nossa equipe.
            </p>
          </div>
          <Link
            to="/imoveis"
            className="hidden items-center gap-1 text-sm font-medium text-[#C5A880] hover:underline md:inline-flex"
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

      <section className="bg-gray-50 py-24 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
            Nossos diferenciais
          </p>
          <h2 className="mt-2 text-center text-3xl font-semibold text-[#0B1528] md:text-4xl font-serif">
            Por que escolher a Pallaro
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { icon: Shield, title: "Tradição e confiança", text: "Décadas de atuação consolidando relacionamentos no mercado." },
              { icon: Award, title: "Curadoria de imóveis", text: "Cada imóvel é avaliado pela nossa equipe antes de ser anunciado." },
              { icon: Headphones, title: "Atendimento próximo", text: "Time dedicado para acompanhar você do primeiro contato à assinatura." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#C5A880]/10 text-[#C5A880]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-[#0B1528]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
