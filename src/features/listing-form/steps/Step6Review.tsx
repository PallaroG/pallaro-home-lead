import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { formatBRL } from "@/lib/format";
import { CATEGORIES, SUBTYPES, FEATURE_GROUPS, type CategoryValue } from "../constants";
import type { ListingFormValues } from "../schema";

interface Props {
  onJump: (step: number) => void;
}

export function Step6Review({ onJump }: Props) {
  const { watch } = useFormContext<ListingFormValues>();
  const v = watch();

  const category = (v.category ?? "residencial") as CategoryValue;
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  const subtypeLabel = SUBTYPES[category]?.find((s) => s.value === v.subtype)?.label ?? v.subtype;

  const selectedFeatures = Object.entries(v.features ?? {})
    .filter(([, vv]) => vv)
    .map(([k]) => k);

  const featuresByGroup = FEATURE_GROUPS.map((g) => ({
    label: g.label,
    items: g.items.filter((i) => selectedFeatures.includes(i)),
  })).filter((g) => g.items.length > 0);

  const owners = v.owners ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Revisão e envio para análise</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Confira todas as informações antes de enviar.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit border-primary/30 bg-primary/10 text-primary">
          Aguardando análise da Pallaro
        </Badge>
      </div>

      <Section title="Dados principais" onEdit={() => onJump(1)}>
        <KV k="Título" val={v.title} />
        <KV k="Categoria / Tipo" val={`${categoryLabel} • ${subtypeLabel}`} />
        <KV k="Valor de venda" val={v.price ? formatBRL(Number(v.price)) : "—"} />
        <KV
          k="Localização"
          val={`${v.address ?? ""}, ${v.number ?? ""} — ${v.neighborhood ?? ""}, ${v.city ?? ""}/${v.state ?? ""}`}
        />
        <KV
          k="Áreas / Cômodos"
          val={`${v.areaTotal ?? 0} m² total • ${v.areaBuilt ?? 0} m² constr. • ${v.bedrooms ?? 0} quartos • ${v.suites ?? 0} suítes • ${v.bathrooms ?? 0} banheiros • ${v.parkingSpots ?? 0} vagas`}
        />
      </Section>

      <Section title="Características selecionadas" onEdit={() => onJump(2)}>
        {featuresByGroup.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma característica selecionada.</p>
        ) : (
          featuresByGroup.map((g) => (
            <div key={g.label} className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {g.label}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <Badge key={i} variant="secondary" className="font-normal">{i}</Badge>
                ))}
              </div>
            </div>
          ))
        )}
      </Section>

      <Section title="Informações detalhadas" onEdit={() => onJump(3)}>
        <KV k="Condição" val={v.condition} />
        <KV k="Estágio reforma / obra" val={`${v.renovationStage} / ${v.constructionStage}`} />
        <KV k="Ocupação" val={v.occupation} />
        <KV
          k="IPTU"
          val={
            v.iptuMode === "isento"
              ? "Isento"
              : `${v.iptuMode} — ${formatBRL(Number(v.iptuValue ?? 0))}`
          }
        />
        <KV
          k="Condomínio"
          val={
            v.condoMode === "isento"
              ? "Isento"
              : formatBRL(Number(v.condoValue ?? 0))
          }
        />
      </Section>

      <Section title="Proprietários e chaves" onEdit={() => onJump(4)}>
        <KV
          k="Proprietários"
          val={
            owners.length > 0
              ? owners.map((o) => `${o.name} (${o.percentage}%)`).join(", ")
              : "—"
          }
        />
        <KV k="Corretor responsável" val={v.responsibleBroker} />
        <KV k="Chave disponível" val={v.keyAvailable} />
        <KV k="Local da chave" val={v.keyLocation} />
        <KV
          k="Autorização"
          val={`${v.authorized} • ${v.contractDays} dias`}
        />
      </Section>

      <Section title="Transação e contrato" onEdit={() => onJump(5)}>
        <KV k="Valor anunciado" val={v.announcedPrice ? formatBRL(Number(v.announcedPrice)) : "—"} />
        <KV k="Valor mínimo" val={v.minimumPrice ? formatBRL(Number(v.minimumPrice)) : "—"} />
        <KV k="Comissão" val={`${v.commission ?? 0}%`} />
        <KV k="Financiamento" val={v.acceptsFinancing} />
        <KV k="Permuta" val={v.acceptsExchange} />
        <KV
          k="Tipo de contrato"
          val={v.contractType === "exclusividade" ? "Com exclusividade" : "Sem exclusividade"}
        />
        <KV
          k="Assinatura"
          val={
            v.signed
              ? `${v.signatureName} • ${v.signatureDocument}`
              : "Pendente"
          }
        />
      </Section>

      <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
        Ao enviar, sua proposta entrará na fila de análise. A equipe Pallaro fará a validação dos
        dados e entrará em contato para os próximos passos.
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onEdit} className="gap-1">
          <Pencil className="h-3.5 w-3.5" /> Editar
        </Button>
      </header>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KV({ k, val }: { k: string; val?: string | number }) {
  return (
    <div className="grid gap-1 border-b border-border/60 py-1.5 last:border-0 sm:grid-cols-[180px_1fr]">
      <span className="text-xs text-muted-foreground">{k}</span>
      <span className="text-sm text-foreground">{val || "—"}</span>
    </div>
  );
}
