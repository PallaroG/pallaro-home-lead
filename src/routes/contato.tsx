import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Pallaro Seguros e Imóveis" },
      { name: "description", content: "Fale com a equipe da Pallaro Seguros e Imóveis." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">Fale com a gente</h1>
      <p className="mt-2 text-muted-foreground">
        Nossa equipe está pronta para atender você.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: Phone, title: "Telefone", value: "(54) 3000-0000" },
          { icon: Mail, title: "E-mail", value: "contato@pallaro.com.br" },
          { icon: MapPin, title: "Endereço", value: "Bento Gonçalves — RS" },
          { icon: Clock, title: "Horário", value: "Seg a Sex, 8h às 18h" },
        ].map(({ icon: Icon, title, value }) => (
          <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="font-medium text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
