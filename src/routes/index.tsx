import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Search, Shield, Award, Headphones, ArrowRight, Home, Building, 
  Building2, Map, MessageSquare, Scale, BarChart3, Megaphone, Users, ShieldCheck,
  Key, BadgeDollarSign, CalendarCheck, TrendingUp
} from "lucide-react";
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
          1. HERO SECTION
          ========================================= */}
      <section id="inicio" className="relative isolate pt-36 pb-48 md:pt-48 md:pb-64 overflow-hidden">
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

          <form onSubmit={handleSearch} className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-4 items-end">
            <div className="col-span-1 md:col-span-3 lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input placeholder="O que você procura?" className="pl-10 bg-white border-0 text-black h-12 rounded-sm focus-visible:ring-[#C5A880]" />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="bg-white border-0 text-black h-12 rounded-sm focus:ring-[#C5A880]">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
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
            <Button type="submit" className="bg-[#C5A880] text-[#0B1528] font-bold hover:bg-[#b0946d] h-12 w-full col-span-1 md:col-span-3 lg:col-span-1 transition-colors rounded-sm">
              Buscar
            </Button>
          </form>
        </div>
      </section>

      {/* =========================================
          3. CATEGORIAS DE IMÓVEIS (Atualizado com imagens)
          ========================================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              name: "Casas", 
              icon: Home, 
              route: "casa",
              image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" 
            },
            { 
              name: "Apartamentos", 
              icon: Building2, 
              route: "apartamento",
              image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" 
            },
            { 
              name: "Comerciais", 
              icon: Building, 
              route: "comercial",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
            },
            { 
              name: "Terrenos", 
              icon: Map, 
              route: "terreno",
              image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" 
            },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              to="/imoveis" 
              search={{ type: cat.route as any }}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#C5A880]/50 hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-[#0B1528] border-4 border-white text-white transition-colors duration-300 group-hover:bg-[#C5A880]">
                  <cat.icon className="h-6 w-6" />
                </div>
              </div>
              
              <div className="flex flex-col items-center pt-10 pb-6 px-4">
                <h3 className="font-serif text-xl font-semibold text-[#0B1528]">{cat.name}</h3>
                <span className="mt-2 flex items-center gap-1 text-sm font-medium text-[#C5A880]">
                  Ver imóveis <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================
          4. IMÓVEIS EM DESTAQUE
          ========================================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">Seleção Pallaro</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0B1528] md:text-4xl font-serif">
              Imóveis em destaque
            </h2>
          </div>
          <Link to="/imoveis" className="hidden items-center gap-1 text-sm font-medium text-[#C5A880] hover:underline md:inline-flex">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* =========================================
          5. DIFERENCIAIS DA PALLARO
          ========================================= */}
      <section id="sobre-nos" className="bg-[#F8F9FA] py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
            Nossos diferenciais
          </p>
          <h2 className="mt-2 text-center text-3xl font-semibold text-[#0B1528] md:text-4xl font-serif max-w-2xl mx-auto">
            Por que escolher a Pallaro para o seu próximo negócio?
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MessageSquare, title: "Atendimento consultivo", text: "Foco total em entender as suas reais necessidades e perfil." },
              { icon: Scale, title: "Segurança jurídica", text: "Análise rigorosa e transparente de toda a documentação envolvida." },
              { icon: BarChart3, title: "Avaliação de mercado", text: "Precificação justa, realista e condizente com a atualidade." },
              { icon: Megaphone, title: "Divulgação profissional", text: "Estratégias avançadas de marketing para destacar o seu imóvel." },
              { icon: Users, title: "Acompanhamento completo", text: "Lado a lado consigo, do primeiro contacto até à entrega das chaves." },
              { icon: ShieldCheck, title: "Integração com seguros", text: "Opções de proteção total para o seu património num só lugar." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-md border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-md hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B1528]/5 text-[#C5A880]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-[#0B1528]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          6. NOSSOS SERVIÇOS
          ========================================= */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880]">Soluções Completas</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#0B1528] md:text-4xl font-serif">
              Tudo o que precisa num só lugar.
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed text-lg">
              Simplificamos a gestão do seu património imobiliário. A nossa equipa de especialistas está preparada para orientá-lo em todas as etapas da sua jornada.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Key, title: "Compra", desc: "Encontre o imóvel ideal" },
              { icon: BadgeDollarSign, title: "Venda", desc: "Negociações ágeis" },
              { icon: CalendarCheck, title: "Locação", desc: "Gestão sem dores de cabeça" },
              { icon: TrendingUp, title: "Investimentos", desc: "Alta rentabilidade" },
            ].map((srv) => (
              <div key={srv.title} className="border border-gray-100 bg-white p-6 rounded-md shadow-sm">
                <srv.icon className="h-8 w-8 text-[#0B1528] mb-4" />
                <h4 className="font-semibold text-lg text-[#0B1528]">{srv.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          7. BANNER MISTO (Imóveis + Seguros)
          ========================================= */}
      <section className="bg-[#0B1528] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A880] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[#C5A880] font-semibold tracking-[0.25em] uppercase text-sm mb-4">
            Uma empresa. Duas especialidades.
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Imóveis <span className="text-gray-400 font-light">+</span> Seguros
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 text-lg mb-10 leading-relaxed">
            Proteja o seu novo património no momento da aquisição. Oferecemos soluções completas em seguros residenciais, comerciais, de vida e consórcios.
          </p>
          <Button size="lg" className="bg-[#C5A880] text-[#0B1528] font-bold hover:bg-[#b0946d] px-8 py-6 text-lg transition-all rounded-sm">
            Conheça a Pallaro Seguros
          </Button>
        </div>
      </section>
    </>
  );
}
