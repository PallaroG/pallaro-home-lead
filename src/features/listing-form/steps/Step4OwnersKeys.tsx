import { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, KeyRound, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, SectionTitle } from "../components/Field";
import { BROKERS, KEY_LOCATIONS } from "../constants";
import type { ListingFormValues } from "../schema";

export function Step4OwnersKeys() {
  const { register, control, watch, setValue, formState: { errors } } =
    useFormContext<ListingFormValues>();

  const owners = useFieldArray({ control, name: "owners" });
  const captadores = useFieldArray({ control, name: "captadores" });

  const start = watch("contractStart");
  const days = Number(watch("contractDays") ?? 0);
  const end =
    start && days > 0
      ? new Date(new Date(start).getTime() + days * 86400000).toLocaleDateString("pt-BR")
      : "—";

  const keyAvailable = watch("keyAvailable") ?? "";
  const keyLocation = watch("keyLocation") ?? "";
  const responsibleBroker = watch("responsibleBroker") ?? "";
  const authorized = watch("authorized") ?? "";

  // Default responsible broker
  useEffect(() => {
    if (!responsibleBroker) setValue("responsibleBroker", BROKERS[0]);
  }, [responsibleBroker, setValue]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Proprietário, chaves e negociação
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadastre quem responde pelo imóvel e como conduziremos a negociação.
        </p>
      </div>

      {/* Owners */}
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <SectionTitle
            title="Informe o(s) dono(s) do imóvel"
            subtitle="Adicione todos os proprietários. A soma dos percentuais deve totalizar 100%."
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              owners.append({
                name: "",
                document: "",
                phone: "",
                email: "",
                percentage: 0,
                notes: "",
              })
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Adicionar proprietário
          </Button>
        </div>

        {owners.fields.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            <Users className="mx-auto mb-2 h-6 w-6" />
            Nenhum proprietário adicionado.
          </div>
        )}

        <div className="space-y-4">
          {owners.fields.map((f, idx) => (
            <div key={f.id} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  Proprietário {idx + 1}
                </h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => owners.remove(idx)}
                  className="gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" /> Remover
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nome do proprietário" error={errors.owners?.[idx]?.name?.message}>
                  <Input {...register(`owners.${idx}.name` as const)} />
                </Field>
                <Field label="CPF / CNPJ" error={errors.owners?.[idx]?.document?.message}>
                  <Input {...register(`owners.${idx}.document` as const)} />
                </Field>
                <Field label="Telefone" error={errors.owners?.[idx]?.phone?.message}>
                  <Input {...register(`owners.${idx}.phone` as const)} placeholder="(54) 9 9999-9999" />
                </Field>
                <Field label="E-mail" error={errors.owners?.[idx]?.email?.message}>
                  <Input type="email" {...register(`owners.${idx}.email` as const)} />
                </Field>
                <Field label="Percentual de propriedade (%)">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    {...register(`owners.${idx}.percentage` as const)}
                  />
                </Field>
                <Field label="Observações">
                  <Input {...register(`owners.${idx}.notes` as const)} />
                </Field>
              </div>
            </div>
          ))}
        </div>
        {typeof errors.owners?.message === "string" && (
          <p className="text-xs text-destructive">{errors.owners.message}</p>
        )}
      </section>

      {/* Keys */}
      <section className="space-y-4">
        <SectionTitle title="Controle de chaves" />
        <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
          <Field label="Chave disponível?" error={errors.keyAvailable?.message}>
            <Select
              value={keyAvailable}
              onValueChange={(v) =>
                setValue("keyAvailable", v as ListingFormValues["keyAvailable"], { shouldValidate: true })
              }
            >
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
                <SelectItem value="combinar">A combinar</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Local da chave" error={errors.keyLocation?.message}>
            <Select
              value={keyLocation}
              onValueChange={(v) =>
                setValue("keyLocation", v as ListingFormValues["keyLocation"], { shouldValidate: true })
              }
            >
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {KEY_LOCATIONS.map((k) => (
                  <SelectItem key={k.value} value={k.value}>{k.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Informações extras sobre a chave">
            <Input {...register("keyNotes")} placeholder="Horários, contato, etc." />
          </Field>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <KeyRound className="h-3.5 w-3.5" />
          Essas informações são compartilhadas apenas com a equipe interna Pallaro.
        </div>
      </section>

      {/* Captadores */}
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <SectionTitle title="Quem são os captadores deste imóvel?" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => captadores.append({ name: "", phone: "", notes: "" })}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" /> Adicionar captador
          </Button>
        </div>

        {captadores.fields.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            Nenhum captador adicionado (opcional).
          </p>
        )}

        <div className="space-y-3">
          {captadores.fields.map((f, idx) => (
            <div key={f.id} className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
              <Field label="Nome do captador">
                <Input {...register(`captadores.${idx}.name` as const)} />
              </Field>
              <Field label="Telefone">
                <Input {...register(`captadores.${idx}.phone` as const)} />
              </Field>
              <Field label="Observações">
                <Input {...register(`captadores.${idx}.notes` as const)} />
              </Field>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => captadores.remove(idx)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corretor */}
      <section className="space-y-4">
        <SectionTitle title="Corretor responsável pela negociação" />
        <div className="max-w-md">
          <Field label="Corretor responsável" error={errors.responsibleBroker?.message}>
            <Select
              value={responsibleBroker}
              onValueChange={(v) => setValue("responsibleBroker", v, { shouldValidate: true })}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BROKERS.map((b) => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </section>

      {/* Authorization */}
      <section className="space-y-4">
        <SectionTitle title="Autorização para negociação" />
        <div className="grid gap-4 rounded-xl border border-border bg-card p-5 md:grid-cols-4">
          <Field label="Autorizado?" error={errors.authorized?.message}>
            <Select
              value={authorized}
              onValueChange={(v) =>
                setValue("authorized", v as ListingFormValues["authorized"], { shouldValidate: true })
              }
            >
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
                <SelectItem value="analise">Em análise</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Início do contrato">
            <Input type="date" {...register("contractStart")} />
          </Field>
          <Field label="Duração (dias)">
            <Input type="number" min={0} {...register("contractDays")} />
          </Field>
          <Field label="Final do contrato">
            <div className="flex h-9 items-center rounded-md border border-input bg-secondary/40 px-3 text-sm text-foreground">
              <Textarea readOnly value={end} className="h-full min-h-0 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" rows={1} />
            </div>
          </Field>
        </div>
      </section>
    </div>
  );
}
