import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bed, Bath, Car, Maximize, MapPin, ArrowLeft, MessageCircle, Mail } from "lucide-react";
import { getPropertyById } from "@/data/properties";
import { formatBRL, formatArea, propertyTypeLabels, purposeLabels } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/imoveis/$id")({
  loader: ({ params }) => {
    const property = getPropertyById(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — Pallaro Imóveis` },
          { name: "description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:title", content: loaderData.property.title },
          { property: "og:description", content: loaderData.property.description.slice(0, 160) },
          { property: "og:image", content: loaderData.property.images[0] },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-foreground">Imóvel não encontrado</h1>
      <p className="mt-2 text-muted-foreground">
        O imóvel que você procura não está mais disponível.
      </p>
      <Button asChild className="mt-6">
        <Link to="/imoveis">Ver outros imóveis</Link>
      </Button>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const message = encodeURIComponent(
    `Olá! Tenho interesse no imóvel "${property.title}" anunciado pela Pallaro.`,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/imoveis"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar para imóveis
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <Carousel className="overflow-hidden rounded-xl">
            <CarouselContent>
              {property.images.map((src: string, i: number) => (
                <CarouselItem key={i}>
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img src={src} alt={`${property.title} — foto ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
          </Carousel>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge className="bg-primary text-primary-foreground">
              {purposeLabels[property.purpose]}
            </Badge>
            <Badge variant="secondary">{propertyTypeLabels[property.type]}</Badge>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-foreground">{property.title}</h1>
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {property.neighborhood}, {property.city}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
            {property.bedrooms > 0 && (
              <Feature icon={Bed} label="Dormitórios" value={property.bedrooms} />
            )}
            {property.bathrooms > 0 && (
              <Feature icon={Bath} label="Banheiros" value={property.bathrooms} />
            )}
            {property.parkingSpots > 0 && (
              <Feature icon={Car} label="Vagas" value={property.parkingSpots} />
            )}
            <Feature icon={Maximize} label="Área" value={formatArea(property.areaM2)} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">Sobre o imóvel</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <p className="text-sm text-muted-foreground">Valor de venda</p>
          <p className="mt-1 text-3xl font-bold text-primary">{formatBRL(property.price)}</p>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild size="lg" className="gap-2">
              <a
                href={`https://wa.me/5554300000000?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={`mailto:contato@pallaro.com.br?subject=${encodeURIComponent(property.title)}&body=${message}`}>
                <Mail className="h-4 w-4" /> Enviar e-mail
              </a>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Código do imóvel: {property.id}
          </p>
        </aside>
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}
