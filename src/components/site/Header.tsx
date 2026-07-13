import { Link } from "@tanstack/react-router";
import { Menu, Home } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Início" },
  { to: "/imoveis", label: "Imóveis" },
  { to: "/anunciar-imovel", label: "Anunciar Imóvel" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-primary text-primary-foreground backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Home className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold tracking-wide text-primary-foreground">
              Pallaro
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
              Seguros e Imóveis
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-4 py-2 text-sm font-medium tracking-wide text-primary-foreground/75 transition hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/anunciar-imovel">Anunciar imóvel</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="text-primary-foreground hover:bg-white/10 hover:text-accent"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle>Menu</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
