import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROPERTY_CONDITIONS,
  RENOVATION_STAGES,
  CONSTRUCTION_STAGES,
  OCCUPATIONS,
  IPTU_MODES,
  CONDO_MODES,
} from "../constants";
import type { ListingFormValues } from "../schema";
import { Field } from "../components/Field";

export function Step3Details() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ListingFormValues>();
  const iptuMode = watch("iptuMode") ?? "mensal";
  const condoMode = watch("condoMode") ?? "nao_isento";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Informações detalhadas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Esses dados ajudam a equipe Pallaro a fazer uma avaliação precisa.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          name="condition"
          label="Condição do imóvel"
          options={PROPERTY_CONDITIONS}
          value={watch("condition") ?? ""}
          onChange={(v) => setValue("condition", v as ListingFormValues["condition"], { shouldValidate: true })}
          error={errors.condition?.message}
        />
        <SelectField
          name="occupation"
          label="Ocupação do imóvel"
          options={OCCUPATIONS}
          value={watch("occupation") ?? ""}
          onChange={(v) => setValue("occupation", v as ListingFormValues["occupation"], { shouldValidate: true })}
          error={errors.occupation?.message}
        />
        <SelectField
          name="renovationStage"
          label="Estágio da reforma"
          options={RENOVATION_STAGES}
          value={watch("renovationStage") ?? "nao_aplica"}
          onChange={(v) => setValue("renovationStage", v as ListingFormValues["renovationStage"], { shouldValidate: true })}
        />
        <SelectField
          name="constructionStage"
          label="Estágio da obra"
          options={CONSTRUCTION_STAGES}
          value={watch("constructionStage") ?? "nao_aplica"}
          onChange={(v) => setValue("constructionStage", v as ListingFormValues["constructionStage"], { shouldValidate: true })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="iptuMode"
            label="Modo do IPTU"
            options={IPTU_MODES}
            value={iptuMode}
            onChange={(v) => setValue("iptuMode", v as ListingFormValues["iptuMode"], { shouldValidate: true })}
          />
          <Field label="Valor do IPTU/ITR (R$)">
            <Input
              type="number"
              min={0}
              step="0.01"
              disabled={iptuMode === "isento"}
              {...register("iptuValue")}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="condoMode"
            label="Modo do condomínio"
            options={CONDO_MODES}
            value={condoMode}
            onChange={(v) => setValue("condoMode", v as ListingFormValues["condoMode"], { shouldValidate: true })}
          />
          <Field label="Valor do condomínio (R$)">
            <Input
              type="number"
              min={0}
              step="0.01"
              disabled={condoMode === "isento"}
              {...register("condoValue")}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
