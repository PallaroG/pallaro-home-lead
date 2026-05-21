import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus } from "lucide-react";
import { CATEGORIES, SUBTYPES, BRAZIL_STATES, type CategoryValue } from "../constants";
import type { ListingFormValues } from "../schema";
import { Field } from "../components/Field";

export function Step1MainData() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ListingFormValues>();
  const category = (watch("category") ?? "residencial") as CategoryValue;
  const subtype = watch("subtype") ?? "";
  const state = watch("state") ?? "";

  const subtypes = SUBTYPES[category] ?? [];

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Dados principais do imóvel"
        subtitle="Comece com a categoria e as informações essenciais. Tudo poderá ser revisado antes do envio."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Categoria principal" error={errors.category?.message}>
          <Select
            value={category}
            onValueChange={(v) => {
              setValue("category", v as CategoryValue, { shouldValidate: true });
              setValue("subtype", "", { shouldValidate: false });
            }}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tipo do imóvel" error={errors.subtype?.message}>
          <Select
            value={subtype}
            onValueChange={(v) => setValue("subtype", v, { shouldValidate: true })}
          >
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              {subtypes.map((s) => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field label="Título do anúncio" error={errors.title?.message}>
        <Input placeholder="Ex.: Casa com 3 dormitórios no Centro" {...register("title")} />
      </Field>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Valor de venda (R$)" error={errors.price?.message}>
          <Input type="number" min={0} step="1000" {...register("price")} />
        </Field>
        <Field label="UF" error={errors.state?.message}>
          <Select value={state} onValueChange={(v) => setValue("state", v, { shouldValidate: true })}>
            <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
            <SelectContent>
              {BRAZIL_STATES.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Cidade" error={errors.city?.message}>
          <Input placeholder="Bento Gonçalves" {...register("city")} />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Bairro" error={errors.neighborhood?.message}>
          <Input {...register("neighborhood")} />
        </Field>
        <Field label="Endereço" error={errors.address?.message}>
          <Input placeholder="Rua / Avenida" {...register("address")} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Número" error={errors.number?.message}>
            <Input {...register("number")} />
          </Field>
          <Field label="Complemento">
            <Input {...register("complement")} />
          </Field>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <Field label="Área total (m²)" error={errors.areaTotal?.message}>
          <Input type="number" min={0} step="0.01" {...register("areaTotal")} />
        </Field>
        <Field label="Área construída (m²)">
          <Input type="number" min={0} step="0.01" {...register("areaBuilt")} />
        </Field>
        <Field label="Quartos"><Input type="number" min={0} {...register("bedrooms")} /></Field>
        <Field label="Suítes"><Input type="number" min={0} {...register("suites")} /></Field>
        <Field label="Banheiros"><Input type="number" min={0} {...register("bathrooms")} /></Field>
        <Field label="Vagas"><Input type="number" min={0} {...register("parkingSpots")} /></Field>
      </div>

      <Field label="Descrição do imóvel" error={errors.description?.message}>
        <Textarea
          rows={6}
          placeholder="Conte sobre o imóvel, diferenciais, localização, vizinhança..."
          {...register("description")}
        />
      </Field>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Imagens do imóvel</Label>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 px-6 py-10 text-center">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Arraste fotos ou clique para enviar</p>
          <p className="text-xs text-muted-foreground">
            Upload visual — disponível em breve. Sua equipe Pallaro coletará as imagens no contato.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
