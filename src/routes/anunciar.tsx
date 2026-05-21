import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { saveSubmission } from "@/lib/submissions";

export const Route = createFileRoute("/anunciar")({
  head: () => ({
    meta: [
      { title: "Anunciar Imóvel — Pallaro" },
      {
        name: "description",
        content:
          "Cadastre seu imóvel gratuitamente na Pallaro Seguros e Imóveis. Nossa equipe entrará em contato.",
      },
    ],
  }),
  component: AnunciarPage,
});

const schema = z.object({
  title: z.string().min(5, "Informe um título"),
  type: z.enum(["casa", "apartamento", "terreno", "comercial", "rural"]),
  purpose: z.enum(["venda", "aluguel"]),
  address: z.string().min(5, "Informe o endereço"),
  city: z.string().min(2, "Informe a cidade"),
  price: z.coerce.number().positive("Informe um valor válido"),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  parkingSpots: z.coerce.number().int().min(0),
  areaM2: z.coerce.number().positive("Informe a área"),
  description: z.string().min(20, "Descreva com pelo menos 20 caracteres"),
  ownerName: z.string().min(3, "Informe seu nome"),
  ownerEmail: z.string().email("E-mail inválido"),
  ownerPhone: z.string().min(8, "Informe um telefone válido"),
});

type FormValues = z.infer<typeof schema>;

function AnunciarPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "casa",
      purpose: "venda",
      bedrooms: 0,
      bathrooms: 0,
      parkingSpots: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    saveSubmission({
      property: {
        title: values.title,
        type: values.type,
        purpose: values.purpose,
        address: values.address,
        city: values.city,
        price: values.price,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        parkingSpots: values.parkingSpots,
        areaM2: values.areaM2,
        description: values.description,
      },
      owner: {
        name: values.ownerName,
        email: values.ownerEmail,
        phone: values.ownerPhone,
      },
    });
    toast.success("Imóvel enviado com sucesso!", {
      description: "Nossa equipe entrará em contato em breve.",
    });
    reset();
  };

  const type = watch("type");
  const purpose = watch("purpose");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Anuncie seu imóvel</h1>
        <p className="mt-2 text-muted-foreground">
          Preencha o formulário abaixo. Nossa equipe analisa e entra em contato em até 1 dia útil.
        </p>
      </div>

      <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {["Cadastro gratuito", "Avaliação especializada", "Divulgação imediata"].map((b) => (
          <li key={b} className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 space-y-8 rounded-2xl border border-border bg-card p-6 md:p-8"
      >
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Dados do imóvel</h2>

          <Field label="Título do anúncio" error={errors.title?.message}>
            <Input placeholder="Ex.: Casa com 3 dormitórios no Centro" {...register("title")} />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tipo">
              <Select value={type} onValueChange={(v) => setValue("type", v as FormValues["type"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="casa">Casa</SelectItem>
                  <SelectItem value="apartamento">Apartamento</SelectItem>
                  <SelectItem value="terreno">Terreno</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Finalidade">
              <Select
                value={purpose}
                onValueChange={(v) => setValue("purpose", v as FormValues["purpose"])}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="aluguel">Aluguel</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Endereço" error={errors.address?.message}>
            <Input placeholder="Rua, número e bairro" {...register("address")} />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Cidade" error={errors.city?.message}>
              <Input placeholder="Bento Gonçalves" {...register("city")} />
            </Field>
            <Field
              label={purpose === "aluguel" ? "Valor do aluguel (R$/mês)" : "Valor de venda (R$)"}
              error={errors.price?.message}
            >
              <Input type="number" min={0} step="0.01" {...register("price")} />
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Field label="Dormitórios"><Input type="number" min={0} {...register("bedrooms")} /></Field>
            <Field label="Banheiros"><Input type="number" min={0} {...register("bathrooms")} /></Field>
            <Field label="Vagas"><Input type="number" min={0} {...register("parkingSpots")} /></Field>
            <Field label="Área (m²)" error={errors.areaM2?.message}>
              <Input type="number" min={0} step="0.01" {...register("areaM2")} />
            </Field>
          </div>

          <Field label="Descrição" error={errors.description?.message}>
            <Textarea rows={5} placeholder="Conte os diferenciais do imóvel" {...register("description")} />
          </Field>
        </section>

        <section className="space-y-4 border-t border-border pt-6">
          <h2 className="text-lg font-semibold text-foreground">Seus dados</h2>
          <Field label="Nome completo" error={errors.ownerName?.message}>
            <Input {...register("ownerName")} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="E-mail" error={errors.ownerEmail?.message}>
              <Input type="email" {...register("ownerEmail")} />
            </Field>
            <Field label="Telefone / WhatsApp" error={errors.ownerPhone?.message}>
              <Input type="tel" placeholder="(54) 9 9999-9999" {...register("ownerPhone")} />
            </Field>
          </div>
        </section>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar anúncio"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
