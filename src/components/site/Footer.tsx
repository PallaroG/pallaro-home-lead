import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Pallaro Seguros e Imóveis</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tradição e confiança no mercado imobiliário e securitário da Serra Gaúcha.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Navegação</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Início</Link></li>
            <li><Link to="/imoveis" className="hover:text-foreground">Imóveis</Link></li>
            <li><Link to="/anunciar" className="hover:text-foreground">Anunciar Imóvel</Link></li>
            <li><Link to="/contato" className="hover:text-foreground">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Contato</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>(54) 3000-0000</li>
            <li>contato@pallaro.com.br</li>
            <li>Bento Gonçalves — RS</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Horário</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Seg a Sex: 8h às 18h</li>
            <li>Sábado: 9h às 12h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pallaro Seguros e Imóveis. Todos os direitos reservados.
      </div>
    </footer>
  );
}
