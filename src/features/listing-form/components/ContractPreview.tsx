import { useFormContext } from "react-hook-form";
import { formatBRL } from "@/lib/format";
import { CATEGORIES, SUBTYPES, type CategoryValue } from "../constants";
import type { ListingFormValues } from "../schema";

export function ContractPreview() {
  const { watch } = useFormContext<ListingFormValues>();
  const owners = (watch("owners") ?? []) as ListingFormValues["owners"];
  const title = watch("title") ?? "—";
  const address = `${watch("address") ?? ""}, ${watch("number") ?? ""}${
    watch("complement") ? " - " + watch("complement") : ""
  }`;
  const cityLine = `${watch("neighborhood") ?? ""} — ${watch("city") ?? ""}/${watch("state") ?? ""}`;
  const category = (watch("category") ?? "residencial") as CategoryValue;
  const subtypeValue = watch("subtype") ?? "";
  const subtypeLabel =
    SUBTYPES[category]?.find((s) => s.value === subtypeValue)?.label ?? subtypeValue;
  const categoryLabel = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  const price = Number(watch("announcedPrice") ?? watch("price") ?? 0);
  const commission = Number(watch("commission") ?? 0);
  const contractType = watch("contractType") ?? "exclusividade";
  const contractStart = watch("contractStart");
  const days = Number(watch("contractDays") ?? 0);
  const end =
    contractStart && days > 0
      ? new Date(new Date(contractStart).getTime() + days * 86400000).toLocaleDateString("pt-BR")
      : "—";
  const start = contractStart ? new Date(contractStart).toLocaleDateString("pt-BR") : "—";

  const ownerLine =
    owners.length > 0
      ? owners
          .map((o) => `${o.name || "—"} (${o.document || "—"})`)
          .join(", ")
      : "—";

  return (
    <article className="rounded-xl border border-border bg-secondary/20 p-6 text-sm leading-relaxed text-foreground">
      <header className="mb-4 border-b border-border pb-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Pallaro Seguros e Imóveis
        </p>
        <h4 className="mt-1 text-base font-semibold">
          Autorização para intermediação imobiliária — venda
        </h4>
      </header>

      <dl className="grid gap-3 sm:grid-cols-2">
        <Row label="Proprietário(s)" value={ownerLine} />
        <Row label="Imóvel" value={`${title} — ${categoryLabel} / ${subtypeLabel}`} />
        <Row label="Endereço" value={address} />
        <Row label="Localização" value={cityLine} />
        <Row label="Valor de venda" value={price ? formatBRL(price) : "—"} />
        <Row
          label="Tipo de contrato"
          value={contractType === "exclusividade" ? "Com exclusividade" : "Sem exclusividade"}
        />
        <Row label="Prazo de autorização" value={`${start} até ${end} (${days} dias)`} />
        <Row label="Comissão" value={`${commission}%`} />
      </dl>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Pelo presente instrumento, o(s) proprietário(s) acima identificado(s) autoriza(m) a Pallaro
        Seguros e Imóveis a intermediar a venda do imóvel descrito, nas condições aqui informadas,
        durante o prazo de autorização acordado.{" "}
        {contractType === "exclusividade"
          ? "Na modalidade com exclusividade, a Pallaro terá prioridade na intermediação durante o período contratado."
          : "Na modalidade sem exclusividade, o proprietário poderá negociar o imóvel por outros canais, mantendo a Pallaro autorizada a intermediar a venda."}{" "}
        Este documento é uma pré-visualização preliminar e não constitui contrato válido até a
        formalização junto à equipe Pallaro.
      </p>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="truncate text-sm font-medium text-foreground">{value || "—"}</dd>
    </div>
  );
}
