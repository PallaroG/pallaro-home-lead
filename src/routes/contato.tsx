import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Pallaro Seguros e Imóveis" },
      { name: "description", content: "Fale com a equipe da Pallaro Seguros e Imóveis." },
    ],
  }),
  component: ContatoPage,
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

function ContatoPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
      
      <FadeInSection>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Fale com a gente</h1>
        <p className="mt-2 text-muted-foreground">
          Nossa equipe está pronta para atender você.
        </p>
      </FadeInSection>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Phone, title: "Telefone", value: "(54) 3000-0000" },
          { icon: Mail, title: "E-mail", value: "contato@pallaro.com.br" },
          { icon: MapPin, title: "Endereço", value: "Bento Gonçalves — RS" },
          { icon: Clock, title: "Horário", value: "Seg a Sex, 8h às 18h" },
        ].map(({ icon: Icon, title, value }, index) => (
          
          // O delay progressivo (index * 150) cria o efeito em escadinha
          <FadeInSection key={title} delay={150 + (index * 150)}>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 h-full shadow-sm hover:shadow-md transition-shadow">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="font-medium text-foreground">{value}</p>
              </div>
            </div>
          </FadeInSection>
          
        ))}
      </div>
    </div>
  );
}
