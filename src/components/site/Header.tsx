import { Link } from "@tanstack/react-router";
import { Menu, Home } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// Alteramos os itens para refletir a Especificação Técnica.
// O 'as any' evita erros do TanStack Router enquanto não criamos as rotas definitivas.
const nav = [
  { to: "/", label: "Início" },
  { to: "/imoveis", label: "Comprar" },
  { to: "/imoveis", label: "Alugar" },
  { to: "/imoveis", label: "Comercial" },
  { to: "/", label: "Sobre Nós" }, // Placeholder: Ajustaremos a rota quando criarmos a página Sobre
  { to: "/contato", label: "Contato" },
] as any;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B1528] text-primary-foreground backdrop-blur">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          {/* Ícone Dourado simulando o logo */}
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C5A880] text-[#0B1528]">
            <Home className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-2xl font-semibold tracking-widest text-white">
              PALLARO
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880]">
              Seguros e Imóveis
            </span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item: any) => (
            <Link
              key={item.label}
              to={item.to}
              className="px-1 py-2 text-sm font-medium tracking-wide text-white/80 transition hover:text-[#C5A880]"
              activeProps={{ className: "text-[#C5A880] border-b-2 border-[#C5A880]" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* BOTÃO CTA DESKTOP */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-[#C5A880] text-[#0B1528] font-semibold hover:bg-[#b0946d] rounded-sm px-6 py-5 transition-all"
          >
            {/* Mantemos o link para /anunciar-imovel, mas mudamos o texto */}
            <Link to="/anunciar-imovel">Avaliar meu imóvel</Link>
          </Button>
        </div>

        {/* MENU MOBILE */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="text-white hover:bg-white/10 hover:text-[#C5A880]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#0B1528] border-l-white/10 text-white">
            <SheetTitle className="text-white text-left font-serif tracking-widest mt-4">PALLARO</SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {nav.map((item: any) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-[#C5A880] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-6 bg-[#C5A880] text-[#0B1528] font-semibold hover:bg-[#b0946d] w-full"
              >
                <Link to="/anunciar-imovel" onClick={() => setOpen(false)}>
                  Avaliar meu imóvel
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
