import { Link } from "@tanstack/react-router";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import type { Property } from "@/types/property";
import { formatBRL, propertyTypeLabels, purposeLabels } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to="/imoveis/$id"
      params={{ id: property.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {purposeLabels[property.purpose]}
          </Badge>
          <Badge variant="secondary">{propertyTypeLabels[property.type]}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-foreground">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {property.neighborhood}, {property.city}
          </p>
        </div>
        <p className="text-lg font-bold text-primary">{formatBRL(property.price)}</p>
        <div className="mt-auto flex flex-wrap gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1"><Bed className="h-4 w-4" />{property.bedrooms}</span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1"><Bath className="h-4 w-4" />{property.bathrooms}</span>
          )}
          {property.parkingSpots > 0 && (
            <span className="flex items-center gap-1"><Car className="h-4 w-4" />{property.parkingSpots}</span>
          )}
          <span className="flex items-center gap-1"><Maximize className="h-4 w-4" />{property.areaM2} m²</span>
        </div>
      </div>
    </Link>
  );
}
