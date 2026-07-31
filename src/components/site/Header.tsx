import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// IMPORTANDO A LOGO DIRETAMENTE DA PASTA SRC
import logoImg from "@/logo.png";

const nav = [
  { id: "inicio", to: "/", label: "Início" },
  { id: "ver-imoveis", to: "/imoveis", label: "Ver Imóveis" },
  { id: "sobre-nos", to: "/", label: "Sobre Nós" },
  { id: "contato", to: "/contato", label: "Contato" },
] as any;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Início");
  
  const location = useLocation();

  // Verifica se o usuário está na página inicial
  const isHomePage = location.pathname === "/";
  // Em páginas internas, o header sempre fica com fundo sólido e compacto
  const solidHeader = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isHomePage) {
        const sections = [
          { id: "inicio", label: "Início" },
          { id: "sobre-nos", label: "Sobre Nós" }
        ];

        let currentActive = "Início";

        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            if (window.scrollY >= element.offsetTop - 120) {
              currentActive = section.label;
            }
          }
        }
        setActiveItem(currentActive);
      }
    };

    if (location.pathname === "/contato") {
      setActiveItem("Contato");
    } else if (location.pathname.startsWith("/imoveis")) {
      setActiveItem("Ver Imóveis");
    } else if (location.pathname === "/anunciar-imovel") {
      setActiveItem("");
    } else {
      handleScroll(); 
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, isHomePage]);

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    if (isHomePage && item.to === "/") {
      const element = document.getElementById(item.id);
      if (element) {
        e.preventDefault(); 
        window.scrollTo({
          top: element.offsetTop - 90, 
          behavior: "smooth",
        });
      } else if (item.id === "inicio") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setActiveItem(item.label);
    } else {
      setActiveItem(item.label);
    }
    setOpen(false); 
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 font-sans ${
        solidHeader 
          ? "bg-[#030616] shadow-lg py-2"
          : "bg-gradient-to-b from-[#030616]/90 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        <Link to="/" onClick={(e) => handleNavClick(e, { id: "inicio", to: "/", label: "Início" })} className="flex items-center">
          {/* USANDO A LOGO IMPORTADA AQUI */}
          <img 
            src={logoImg} 
            alt="Pallaro Seguros e Imóveis" 
            className={`transition-all duration-300 object-contain ${
              solidHeader ? "h-15" : "h-28"
            }`} 
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item: any) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`px-1 py-2 text-sm font-bold tracking-wide transition-all ${
                activeItem === item.label
                  ? "text-[#d99f2d] border-b-2 border-[#d99f2d]"
                  : "text-white/90 hover:text-[#d99f2d]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Button
            asChild
            className="bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-[#030616] font-bold hover:brightness-110 border-0 rounded-sm px-6 py-5 transition-all"
          >
            <Link to="/anunciar-imovel">Avaliar meu Imóvel</Link>
          </Button>
          
          <a 
            href="https://wa.me/5511999999999" 
            target="_blank" 
            rel="noreferrer" 
            className="text-white hover:text-[#25D366] transition-colors flex items-center justify-center h-10 w-10 rounded-full border border-white/20 hover:border-[#25D366]"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
             </svg>
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="text-white hover:bg-white/10 hover:text-[#d99f2d]"
            >
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#030616] border-l-white/10 text-white font-sans">
            <SheetTitle className="text-white text-left mt-4">
               {/* USANDO A LOGO IMPORTADA AQUI TAMBÉM */}
               <img src={logoImg} alt="Pallaro" className="h-8 object-contain" />
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {nav.map((item: any) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`rounded-md px-3 py-3 text-base font-bold transition-colors ${
                    activeItem === item.label ? "text-[#d99f2d] bg-white/5" : "text-white/90 hover:bg-white/10 hover:text-[#d99f2d]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-6 bg-gradient-to-r from-[#d99f2d] to-[#e8bc4a] text-[#030616] font-bold hover:brightness-110 border-0 w-full"
              >
                <Link to="/anunciar-imovel" onClick={() => setOpen(false)}>
                  Avaliar meu Imóvel
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
