import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
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
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/properties";

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
  },
  {
    name: "Amanda Ferreira",
    text: '"Aluguei minha sala comercial com eles e foi super tranquilo. O contrato é claro, sem letrinhas miúdas. Sensacional."'
  },
  {
    name: "Marcos Lima",
    text: '"Profissionais demais! Tiraram umas fotos incríveis da minha casa e em duas semanas já tínhamos negócio fechado."'
  },
  {
    name: "Beatriz Rocha",
    text: '"Eles entenderam de cara que eu precisava de um lugar perto do metrô. Não ficaram me empurrando imóvel nada a ver. Top!"'
  },
  {
    name: "Tiago Nogueira",
    text: '"Sempre achei que mexer com financiamento era um pesadelo, mas o pessoal me explicou tudo desenhadinho. Deu tudo certo!"'
  },
  {
    name: "Roberto Silva",
    text: '"Comprei pra investir e o retorno foi ótimo. A avaliação que eles fazem do mercado é muito pé no chão, sem ilusão."'
  },
  {
    name: "Fernanda Oliveira",
    text: '"Zero dor de cabeça. Desde a primeira visita até a entrega das chaves, me senti super acompanhada. Vocês arrasam!"'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("comprar");
  
  const [type, setType] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const carouselRef = useRef<HTMLDivElement>(null);

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
      <section className="container mx-auto px-4 -mt-32 relative z-10 mb-20 font-sans">
        <FadeInSection delay={300}>
          <div className="bg-[#030616] rounded-xl shadow-2xl p-6 border border-white/5">
            
            {/* Tabs */}
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

            {/* Formulário */}
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
              
              {/* Caixa branca com os inputs */}
              <div className="flex-1 w-full bg-white rounded-md grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                
                {/* Cidade */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Cidade</label>
                  <div className="flex items-center">
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 shadow-none text-sm">
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
                  </div>
                </div>

                {/* Bairro */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Bairro</label>
                  <div className="flex items-center">
                    <Select>
                      <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 shadow-none text-sm">
                        <SelectValue placeholder="Selecione o bairro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centro">Centro</SelectItem>
                        <SelectItem value="jardins">Jardins</SelectItem>
                      </SelectContent>
                    </Select>
                    <MapPin className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
                  </div>
                </div>

                {/* Tipo de Imóvel */}
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

                {/* Faixa de Preço */}
                <div className="px-4 py-3 flex flex-col justify-center">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Faixa de Preço</label>
                  <Select>
                    <SelectTrigger className="w-full bg-transparent border-0 p-0 h-auto text-[#030616] font-semibold focus:ring-0 shadow-none text-sm">
                      <SelectValue placeholder="Valor mínimo - máximo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-500k">Até R$ 500.000</SelectItem>
                      <SelectItem value="500k-1m">R$ 500.000 a R$ 1.000.000</SelectItem>
                      <SelectItem value="acima-1m">Acima de R$ 1.000.000</SelectItem>
                    </SelectContent>
                  </Select>
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
          3. CATEGORIAS DE IMÓVEIS
          ========================================= */}
      <section className="container mx-auto px-4 py-16 font-sans">
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
          ].map((cat, index) => (
            <FadeInSection key={cat.name} delay={index * 150}>
              <Link 
                to="/imoveis" 
                search={{ type: cat.route as any }}
                className="group relative flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#d99f2d]/50 hover:-translate-y-1"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="absolute top-48 left-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#030616] border-4 border-white text-white transition-colors duration-300 group-hover:bg-[#d99f2d]">
                  <cat.icon className="h-6 w-6" />
                </div>
                
                <div className="flex flex-col items-center pt-8 pb-6 px-4">
                  <h3 className="text-xl font-bold text-[#030616]">{cat.name}</h3>
                  <span className="mt-2 flex items-center gap-1 text-sm font-medium text-[#d99f2d]">
                    Ver imóveis <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* =========================================
          4. PROPOSTA DE VALOR E SERVIÇOS 
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

          <div className="border-t border-gray-200 pt-16 relative mt-12">
            <FadeInSection>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-center">
                <h2 className="text-3xl font-bold text-[#030616]">Nossos serviços</h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] mx-auto mt-3"></div>
              </div>
            </FadeInSection>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Key, title: "Compra", desc: "Encontramos o imóvel ideal para você com as melhores condições." },
                { icon: TrendingUp, title: "Venda", desc: "Avaliação profissional e divulgação estratégica para vender seu imóvel." },
                { icon: Home, title: "Locação", desc: "Segurança e praticidade para proprietário e inquilino." },
                { icon: Building, title: "Investimentos", desc: "Imóveis selecionados para gerar renda e valorização do seu patrimônio." }
              ].map((srv, idx) => (
                <FadeInSection key={idx} delay={idx * 150}>
                  <div className="border border-gray-100 shadow-sm p-8 flex flex-col items-start hover:shadow-md transition-all duration-300 hover:-translate-y-1 rounded-md bg-white h-full">
                    <srv.icon className="w-10 h-10 text-[#d99f2d] mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl font-bold text-[#030616] mb-3">{srv.title}</h3>
                    <p className="text-sm text-gray-600 mb-8 flex-grow leading-relaxed">{srv.desc}</p>
                    <Link to="/contato" className="text-[#d99f2d] font-bold text-sm flex items-center hover:underline group mt-auto">
                      Saiba mais <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          5. BANNER MISTO (Imóveis + Seguros)
          ========================================= */}
      <section className="bg-[#030616] text-white py-24 relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d99f2d] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <FadeInSection>
            <p className="text-[#d99f2d] font-bold tracking-[0.25em] uppercase text-sm mb-4">
              Uma empresa. Duas especialidades.
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Imóveis <span className="text-gray-400 font-light">+</span> Seguros
            </h2>
            <p className="max-w-2xl mx-auto text-white/80 text-lg mb-10 leading-relaxed">
              Proteja o seu novo património no momento da aquisição. Oferecemos soluções completas em seguros residenciais, comerciais, de vida e consórcios.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-[#030616] font-bold hover:brightness-110 px-8 py-6 text-lg transition-all rounded-sm border-0">
              Conheça a Pallaro Seguros
            </Button>
          </FadeInSection>
        </div>
      </section>

      {/* =========================================
          6. COMO FUNCIONA (Passo a passo)
          ========================================= */}
      <section className="container mx-auto px-4 py-24 font-sans">
        <FadeInSection>
          <h2 className="text-center text-3xl font-bold text-[#030616] md:text-4xl mb-16">
            Como funciona
          </h2>
        </FadeInSection>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-[2px] bg-gray-200 -z-10"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { step: "01", icon: ClipboardList, title: "Conte o que procura" },
              { step: "02", icon: Search, title: "Receba imóveis selecionados" },
              { step: "03", icon: CalendarCheck, title: "Agende visita" },
              { step: "04", icon: Handshake, title: "Negociação" },
              { step: "05", icon: FileText, title: "Documentação" },
              { step: "06", icon: Key, title: "Entrega das chaves" },
            ].map((item, index) => (
              <FadeInSection key={item.step} delay={index * 150}>
                <div className="flex flex-col items-center text-center relative group">
                  <div className="h-20 w-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center relative mb-6 transition-all duration-300 group-hover:border-[#d99f2d] shadow-sm">
                    <item.icon className="h-8 w-8 text-[#030616]" />
                    <span className="absolute -bottom-2 bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-[#030616] text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#030616] max-w-[140px] leading-tight">
                    {item.title}
                  </h3>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          7. DEPOIMENTOS (Carrossel Interativo)
          ========================================= */}
      <section className="bg-[#F8F9FA] py-24 font-sans">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <h2 className="text-3xl font-bold text-[#030616] md:text-4xl text-center md:text-left">
                O que nossos clientes dizem
              </h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => scrollTestimonials('left')} 
                  className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d99f2d] hover:text-white hover:border-[#d99f2d] transition-all"
                  aria-label="Ver anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => scrollTestimonials('right')} 
                  className="h-12 w-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#d99f2d] hover:text-white hover:border-[#d99f2d] transition-all"
                  aria-label="Ver próximo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((review, i) => (
                <div 
                  key={i} 
                  className="min-w-[100%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] snap-center shrink-0 bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-[#d99f2d] text-[#d99f2d]" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed italic mb-8">
                      {review.text}
                    </p>
                  </div>
                  <h4 className="font-bold text-[#030616]">{review.name}</h4>
                </div>
              ))}
            </div>
          </FadeInSection>
          
        </div>
      </section>

      {/* =========================================
          8. CTA FINAL DE AVALIAÇÃO
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
