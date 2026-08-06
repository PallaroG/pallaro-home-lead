import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { 
  Search, 
  Home, 
  Building, 
  Building2, 
  Map, 
  ArrowRight,
  UserCircle,
  ShieldCheck,
  LineChart,
  Megaphone,
  LifeBuoy,
  CheckCircle,
  Key,
  TrendingUp,
  ClipboardList,
  CalendarCheck,
  Handshake,
  FileText,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/property/PropertyCard";

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

// A biblioteca 'places' do Google precisa ser declarada fora do componente para não recarregar
const libraries: any = ["places"];

// =========================================
// COMPONENTE DE ANIMAÇÃO (FADE IN ON SCROLL)
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

const testimonials = [
  {
    name: "Mariana Costa",
    text: '"Gente, atendimento nota mil! A equipe me ajudou a achar uma casa com quintal pros meus cachorros sem burocracia nenhuma. Recomendo de olhos fechados!"'
  },
  {
    name: "Carlos Eduardo",
    text: '"Vendi meu apê bem mais rápido do que eu imaginava. O pessoal cuidou de toda aquela papelada chata, eu só tive o trabalho de assinar."'
  },
  {
    name: "Juliana Mendes",
    text: '"Eu tava morrendo de medo de comprar meu primeiro imóvel e cair em furada. A consultoria deles me deu uma paz absurda. Valeu demais!"'
  },
  {
    name: "Rafael Souza",
    text: '"Sabe aquela sensação de que o corretor realmente tá te ouvindo? Foi assim desde o primeiro dia. Achei meu cantinho perfeito."'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("comprar");
  
  // Estados do Formulário
  const [city, setCity] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const carouselRef = useRef<HTMLDivElement>(null);
  const featured = properties.filter((p) => p.featured);

  // =========================================
  // INTEGRAÇÃO COM GOOGLE MAPS
  // =========================================
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [cityAutocomplete, setCityAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [bairroAutocomplete, setBairroAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [cityBounds, setCityBounds] = useState<google.maps.LatLngBounds | undefined>(undefined);

  // Carrega o Autocomplete de Cidade
  const onCityLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.setTypes(["(cities)"]);
    autocomplete.setComponentRestrictions({ country: "br" });
    setCityAutocomplete(autocomplete);
  };

  // Quando o usuário escolhe uma Cidade
  const onCityPlaceChanged = () => {
    if (cityAutocomplete !== null) {
      const place = cityAutocomplete.getPlace();
      setCity(place.name || "");
      
      // Salva a área (limites) da cidade para restringir o bairro depois
      if (place.geometry?.viewport) {
        setCityBounds(place.geometry.viewport);
        // Atualiza os limites do campo de bairro, se ele já estiver carregado
        if (bairroAutocomplete) {
          bairroAutocomplete.setBounds(place.geometry.viewport);
          bairroAutocomplete.setOptions({ strictBounds: true });
        }
      }
    }
  };

  // Carrega o Autocomplete de Bairro
  const onBairroLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocomplete.setTypes(["neighborhood"]); // API usa esse termo para bairros
    autocomplete.setComponentRestrictions({ country: "br" });
    if (cityBounds) {
      autocomplete.setBounds(cityBounds);
      autocomplete.setOptions({ strictBounds: true });
    }
    setBairroAutocomplete(autocomplete);
  };

  const onBairroPlaceChanged = () => {
    if (bairroAutocomplete !== null) {
      const place = bairroAutocomplete.getPlace();
      setNeighborhood(place.name || "");
    }
  };

  // =========================================
  // ENVIO DO FORMULÁRIO
  // =========================================
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/imoveis",
      search: {
        purpose: activeTab as any,
        type: (type || undefined) as any,
        city: city || undefined,
        neighborhood: neighborhood || undefined,
        price: price || undefined
      },
    });
  }

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section id="inicio" className="relative isolate pt-36 pb-48 md:pt-48 md:pb-64 overflow-hidden font-sans">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(3, 6, 22, 0.95) 0%, rgba(3, 6, 22, 0.3) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920')",
          }}
        />
        
        <div className="container mx-auto px-4">
          <FadeInSection delay={100}>
            <div className="max-w-3xl text-white">
              <p className="text-sm font-bold uppercase tracking-widest text-[#d99f2d] mb-4">
                Pallaro Seguros e Imóveis
              </p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Encontre o <span className="bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] bg-clip-text text-transparent">imóvel</span> ideal<br />para morar ou investir
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light">
                As melhores opções em venda e locação<br />você encontra aqui.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =========================================
          2. CAIXA DE BUSCA FLUTUANTE
          ========================================= */}
      <section className="container mx-auto px-4 -mt-32 relative z-10 mb-8 font-sans">
        <FadeInSection delay={300}>
          <div className="bg-[#030616] rounded-xl shadow-2xl p-6 border border-white/5">
            
            <div className="flex mb-6 gap-2">
              <button 
                onClick={() => setActiveTab("comprar")}
                className={`px-6 py-2.5 text-sm font-bold flex items-center gap-2 rounded-t-md border-b-2 transition-all ${
                  activeTab === "comprar" 
                    ? "text-[#d99f2d] border-[#d99f2d]" 
                    : "text-white/60 border-transparent hover:text-white"
                }`}
              >
                <Home className="h-4 w-4" /> COMPRAR
              </button>
              <button 
                onClick={() => setActiveTab("alugar")}
                className={`px-6 py-2.5 text-sm font-bold flex items-center gap-2 rounded-t-md border-b-2 transition-all ${
                  activeTab === "alugar" 
                    ? "text-[#d99f2d] border-[#d99f2d]" 
                    : "text-white/60 border-transparent hover:text-white"
                }`}
              >
                <Key className="h-4 w-4" /> ALUGAR
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
              
              <div className="flex-1 w-full bg-white rounded-md grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                
                {/* CIDADE - GOOGLE MAPS */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cidade</label>
                  <div className="flex items-center relative">
                    {isLoaded ? (
                      <Autocomplete onLoad={onCityLoad} onPlaceChanged={onCityPlaceChanged} className="w-full">
                        <input
                          type="text"
                          placeholder="Digite a cidade..."
                          className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 focus:outline-none shadow-none text-sm placeholder:font-normal placeholder:text-gray-400"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Autocomplete>
                    ) : (
                      <input disabled placeholder="Carregando..." className="w-full bg-transparent border-0 p-0 text-sm text-gray-400" />
                    )}
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 ml-2 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* BAIRRO - GOOGLE MAPS */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Bairro</label>
                  <div className="flex items-center relative">
                    {isLoaded ? (
                      <Autocomplete onLoad={onBairroLoad} onPlaceChanged={onBairroPlaceChanged} className="w-full">
                        <input
                          type="text"
                          placeholder={city ? "Digite o bairro..." : "Selecione a cidade antes"}
                          disabled={!city}
                          className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 focus:outline-none shadow-none text-sm disabled:opacity-50 placeholder:font-normal placeholder:text-gray-400"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                        />
                      </Autocomplete>
                    ) : (
                      <input disabled placeholder="Carregando..." className="w-full bg-transparent border-0 p-0 text-sm text-gray-400" />
                    )}
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 ml-2 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* TIPO DE IMÓVEL */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Tipo de Imóvel</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 shadow-none text-sm">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* FAIXA DE PREÇO (MISTO: DIGITAR + SELECIONAR) */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Faixa de Preço</label>
                  <input
                    list="opcoes-preco"
                    placeholder="Valor mínimo - máximo"
                    className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 focus:outline-none shadow-none text-sm placeholder:font-normal placeholder:text-gray-400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <datalist id="opcoes-preco">
                    <option value="Até R$ 250.000" />
                    <option value="R$ 250.000 a R$ 500.000" />
                    <option value="R$ 500.000 a R$ 1.000.000" />
                    <option value="Acima de R$ 1.000.000" />
                  </datalist>
                </div>
              </div>

              {/* Botão de Busca */}
              <Button type="submit" className="bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-white hover:brightness-110 border-0 w-full lg:w-auto px-8 min-h-[64px] rounded-md text-sm font-bold tracking-wide flex items-center justify-center gap-2 shrink-0 transition-all">
                <Search className="h-5 w-5" /> BUSCAR IMÓVEL
              </Button>

            </form>
          </div>
        </FadeInSection>
      </section>

      {/* =========================================
          3. ACESSOS RÁPIDOS
          ========================================= */}
      <section className="container mx-auto px-4 pt-12 pb-16 font-sans">
        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 xl:gap-6 lg:divide-x divide-gray-200">
            <Link to="/imoveis" className="flex items-center gap-4 xl:gap-5 lg:px-2 xl:px-4 group">
              <div className="h-14 w-14 xl:h-16 xl:w-16 rounded-full border-2 border-[#d99f2d] flex items-center justify-center text-[#d99f2d] group-hover:bg-[#d99f2d] group-hover:text-white transition-colors shrink-0">
                <Home className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#030616] text-base xl:text-lg leading-tight">Imóveis<br/>para Comprar</h3>
                <p className="text-xs xl:text-sm text-gray-500 mt-1.5 leading-tight">Veja as melhores<br/>oportunidades</p>
              </div>
            </Link>
            
            <Link to="/imoveis" className="flex items-center gap-4 xl:gap-5 lg:px-2 xl:px-4 group">
              <div className="h-14 w-14 xl:h-16 xl:w-16 rounded-full border-2 border-[#d99f2d] flex items-center justify-center text-[#d99f2d] group-hover:bg-[#d99f2d] group-hover:text-white transition-colors shrink-0">
                <Key className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#030616] text-base xl:text-lg leading-tight">Imóveis<br/>para Alugar</h3>
                <p className="text-xs xl:text-sm text-gray-500 mt-1.5 leading-tight">Encontre seu novo<br/>lar para locação</p>
              </div>
            </Link>

            <Link to="/anunciar-imovel" className="flex items-center gap-4 xl:gap-5 lg:px-2 xl:px-4 group">
              <div className="h-14 w-14 xl:h-16 xl:w-16 rounded-full border-2 border-[#d99f2d] flex items-center justify-center text-[#d99f2d] group-hover:bg-[#d99f2d] group-hover:text-white transition-colors shrink-0">
                <ClipboardList className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#030616] text-base xl:text-lg leading-tight">Anuncie seu<br/>Imóvel</h3>
                <p className="text-xs xl:text-sm text-gray-500 mt-1.5 leading-tight">Cadastre seu imóvel<br/>gratuitamente</p>
              </div>
            </Link>

            <Link to="/contato" className="flex items-center gap-4 xl:gap-5 lg:px-2 xl:px-4 group">
              <div className="h-14 w-14 xl:h-16 xl:w-16 rounded-full border-2 border-[#d99f2d] flex items-center justify-center text-[#d99f2d] group-hover:bg-[#d99f2d] group-hover:text-white transition-colors shrink-0">
                <ShieldCheck className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#030616] text-base xl:text-lg leading-tight">Seguro Fiança</h3>
                <p className="text-xs xl:text-sm text-gray-500 mt-1.5 leading-tight">Alugue com mais<br/>segurança e<br/>tranquilidade</p>
              </div>
            </Link>

            <Link to="/contato" className="flex items-center gap-4 xl:gap-5 lg:px-2 xl:px-4 group">
              <div className="h-14 w-14 xl:h-16 xl:w-16 rounded-full border-2 border-[#d99f2d] flex items-center justify-center text-[#d99f2d] group-hover:bg-[#d99f2d] group-hover:text-white transition-colors shrink-0">
                <Calculator className="h-6 w-6 xl:h-7 xl:w-7" />
              </div>
              <div>
                <h3 className="font-bold text-[#030616] text-base xl:text-lg leading-tight">Simule seu<br/>Financiamento</h3>
                <p className="text-xs xl:text-sm text-gray-500 mt-1.5 leading-tight">Faça uma simulação<br/>de forma rápida</p>
              </div>
            </Link>
          </div>
        </FadeInSection>
      </section>

      {/* =========================================
          4. IMÓVEIS EM DESTAQUE
          ========================================= */}
      <section className="container mx-auto px-4 py-16 font-sans">
        <FadeInSection>
          <div className="flex items-end justify-between gap-4 border-b border-gray-200 pb-4 mb-8">
            <div className="relative">
              <h2 className="text-xl md:text-2xl font-bold text-[#030616] uppercase tracking-wide">
                Imóveis em destaque
              </h2>
              <div className="absolute -bottom-[17px] left-0 w-16 h-1 bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a]"></div>
            </div>
            <Link to="/imoveis" className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#d99f2d] uppercase tracking-wider transition-colors">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeInSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, index) => (
            <FadeInSection key={p.id} delay={index * 150}>
              <PropertyCard property={p} />
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* =========================================
          5. PROPOSTA DE VALOR E SERVIÇOS 
          ========================================= */}
      <section id="sobre-nos" className="w-full bg-white py-24 px-4 md:px-8 font-sans">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <FadeInSection>
              <div className="flex flex-col justify-start">
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#d99f2d] mb-4">
                  Por que escolher a Pallaro
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#030616] leading-tight mb-8">
                  Mais do que vender imóveis. <br/>
                  <span className="text-gray-500 font-normal">Ajudamos nossos clientes a tomar decisões seguras.</span>
                </h2>
                <div>
                  <Button variant="outline" size="lg" className="border-2 border-[#d99f2d] text-[#d99f2d] font-bold hover:bg-gradient-to-r hover:from-[#d99f2d] hover:to-[#e8bc4a] hover:text-[#030616] hover:border-transparent transition-all duration-300 px-8 py-6 text-lg rounded-sm bg-transparent">
                    Saiba mais sobre nós
                  </Button>
                </div>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {[
                { icon: UserCircle, title: "Atendimento consultivo", text: "Entendemos sua necessidade e oferecemos as melhores opções." },
                { icon: ShieldCheck, title: "Segurança jurídica", text: "Análise completa da documentação para negociações seguras." },
                { icon: LineChart, title: "Avaliação de mercado", text: "Precificação justa baseada em dados e experiência." },
                { icon: Megaphone, title: "Divulgação profissional", text: "Seu imóvel divulgado nos principais canais e plataformas." },
                { icon: LifeBuoy, title: "Acompanhamento completo", text: "Do início ao fim, cuidamos de todo o processo para você." },
                { icon: CheckCircle, title: "Integração com seguros", text: "Proteção completa para você e seu patrimônio." }
              ].map((item, idx) => (
                <FadeInSection key={idx} delay={200 + (idx * 50)}>
                  <div className="flex gap-4">
                    <item.icon className="w-8 h-8 text-[#d99f2d] shrink-0" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-bold text-[#030616] mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          6. CTA FINAL DE AVALIAÇÃO
          ========================================= */}
      <section className="container mx-auto px-4 py-16 mb-8 font-sans">
        <FadeInSection>
          <div className="relative isolate overflow-hidden rounded-2xl bg-[#030616] px-8 py-16 md:px-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920')" }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#030616] via-[#030616]/90 to-transparent"></div>

            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Quer vender seu imóvel?
              </h2>
              <p className="mt-4 text-white/80 text-lg">
                Receba uma avaliação profissional e gratuita com base nos dados reais do mercado atual.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <Button asChild size="lg" className="bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-[#030616] font-bold hover:brightness-110 px-10 py-7 text-lg transition-all rounded-sm shadow-xl hover:-translate-y-1 border-0">
                <Link to="/anunciar-imovel">Solicitar avaliação</Link>
              </Button>
            </div>
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
