import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileSignature, Lock } from "lucide-react";
import { Field, SectionTitle } from "../components/Field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ListingFormValues } from "../schema";
import { ContractPreview } from "../components/ContractPreview";

export function Step5Transaction() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<ListingFormValues>();
  const contractType = watch("contractType") ?? "exclusividade";
  const acceptsFinancing = watch("acceptsFinancing") ?? "";
  const acceptsExchange = watch("acceptsExchange") ?? "";
  const signed = watch("signed") === true;
  const sigName = watch("signatureName") ?? "";
  const sigDoc = watch("signatureDocument") ?? "";

  const handleSign = () => {
    if (!sigName.trim() || !sigDoc.trim()) {
      setValue("signatureName", sigName, { shouldValidate: true });
      setValue("signatureDocument", sigDoc, { shouldValidate: true });
      return;
    }
    setValue("signed", true as never, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Transação, valores e contrato</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Defina os termos da negociação e revise a autorização para intermediação.
        </p>
      </div>

      <section className="space-y-4">
        <SectionTitle title="Transação" />
        <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            Modalidade da transação: <Badge className="ml-1 bg-primary text-primary-foreground">Vender</Badge>
          </span>
          <span className="ml-auto text-xs text-muted-foreground">A Pallaro trabalha apenas com venda.</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Valor de venda anunciado (R$)" error={errors.announcedPrice?.message}>
            <Input type="number" min={0} step="1000" {...register("announcedPrice")} />
          </Field>
          <Field label="Valor mínimo aceito pelo proprietário (R$)">
            <Input type="number" min={0} step="1000" {...register("minimumPrice")} />
          </Field>
          <Field label="Comissão combinada (%)">
            <Input type="number" min={0} max={100} step="0.1" {...register("commission")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Aceita financiamento?" error={errors.acceptsFinancing?.message}>
              <Select
                value={acceptsFinancing}
                onValueChange={(v) =>
                  setValue("acceptsFinancing", v as ListingFormValues["acceptsFinancing"], { shouldValidate: true })
                }
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="consultar">A consultar</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Aceita permuta?" error={errors.acceptsExchange?.message}>
              <Select
                value={acceptsExchange}
                onValueChange={(v) =>
                  setValue("acceptsExchange", v as ListingFormValues["acceptsExchange"], { shouldValidate: true })
                }
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">Sim</SelectItem>
                  <SelectItem value="nao">Não</SelectItem>
                  <SelectItem value="consultar">A consultar</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <Field label="Observações de negociação">
          <Textarea rows={3} {...register("negotiationNotes")} />
        </Field>
      </section>

      <section className="space-y-4">
        <SectionTitle title="Tipo de contrato" />
        <RadioGroup
          value={contractType}
          onValueChange={(v) =>
            setValue("contractType", v as ListingFormValues["contractType"], { shouldValidate: true })
          }
          className="grid gap-3 md:grid-cols-2"
        >
          {[
            { value: "exclusividade", title: "Com exclusividade" },
            { value: "nao_exclusividade", title: "Sem exclusividade" },
          ].map((opt) => (
            <Label
              key={opt.value}
              htmlFor={`ct-${opt.value}`}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                contractType === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-secondary/40"
              }`}
            >
              <RadioGroupItem id={`ct-${opt.value}`} value={opt.value} className="mt-1" />
              <span className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">{opt.title}</span>
                <span className="text-xs text-muted-foreground">
                  {opt.value === "exclusividade"
                    ? "Na modalidade com exclusividade, a Pallaro terá prioridade na intermediação da venda durante o período contratado."
                    : "Na modalidade sem exclusividade, o proprietário poderá negociar o imóvel por outros canais, mantendo a Pallaro autorizada a intermediar a venda."}
                </span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </section>

      <section className="space-y-4">
        <SectionTitle
          title="Cláusula contratual — pré-visualização"
          subtitle="Documento preliminar para conferência. O contrato definitivo será formalizado pela equipe Pallaro."
        />
        <ContractPreview />

        <div className="space-y-3 rounded-xl border border-border bg-card p-5">
          <CheckboxRow
            id="agreeTerms"
            checked={watch("agreeTerms") === true}
            onChange={(v) => setValue("agreeTerms", v as never, { shouldValidate: true })}
            label="Li e concordo com os termos da autorização de negociação."
            error={errors.agreeTerms?.message}
          />
          <CheckboxRow
            id="agreeTruth"
            checked={watch("agreeTruth") === true}
            onChange={(v) => setValue("agreeTruth", v as never, { shouldValidate: true })}
            label="Confirmo que as informações fornecidas são verdadeiras."
            error={errors.agreeTruth?.message}
          />
          <CheckboxRow
            id="agreeReview"
            checked={watch("agreeReview") === true}
            onChange={(v) => setValue("agreeReview", v as never, { shouldValidate: true })}
            label="Entendo que a equipe Pallaro fará uma análise antes da publicação do imóvel."
            error={errors.agreeReview?.message}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <FileSignature className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Assinatura de autorização</h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nome completo" error={errors.signatureName?.message}>
              <Input disabled={signed} {...register("signatureName")} />
            </Field>
            <Field label="CPF / CNPJ" error={errors.signatureDocument?.message}>
              <Input disabled={signed} {...register("signatureDocument")} />
            </Field>
          </div>

          {signed ? (
            <div className="mt-4 flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>
                Autorização assinada por <strong>{sigName}</strong> em{" "}
                {new Date().toLocaleString("pt-BR")}.
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => setValue("signed", false as never, { shouldValidate: true })}
              >
                Refazer
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={handleSign} className="mt-4 gap-2">
              <FileSignature className="h-4 w-4" /> Assinar autorização
            </Button>
          )}
          {!signed && errors.signed?.message && (
            <p className="mt-2 text-xs text-destructive">{errors.signed.message}</p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Esta é uma assinatura visual de demonstração. A formalização legal será conduzida pela
            equipe Pallaro.
          </p>
        </div>
      </section>
    </div>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
  error,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
        <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} />
        <span>{label}</span>
      </label>
      {error && <p className="ml-7 mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
