import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listingSchema, STEP_FIELDS, type ListingFormValues } from "@/features/listing-form/schema";
import { STEPS } from "@/features/listing-form/constants";
import { StepIndicator } from "@/features/listing-form/StepIndicator";
import { StepNav } from "@/features/listing-form/StepNav";
import { Step1MainData } from "@/features/listing-form/steps/Step1MainData";
import { Step2Features } from "@/features/listing-form/steps/Step2Features";
import { Step3Details } from "@/features/listing-form/steps/Step3Details";
import { Step4OwnersKeys } from "@/features/listing-form/steps/Step4OwnersKeys";
import { Step5Transaction } from "@/features/listing-form/steps/Step5Transaction";
import { Step6Review } from "@/features/listing-form/steps/Step6Review";
import {
  loadDraft,
  saveDraft,
  clearDraft,
  loadStep,
  saveStep,
} from "@/features/listing-form/storage";
import { saveSubmission } from "@/lib/submissions";

export const Route = createFileRoute("/anunciar-imovel")({
  head: () => ({
    meta: [
      { title: "Anunciar Imóvel — Pallaro Seguros e Imóveis" },
      {
        name: "description",
        content:
          "Cadastre seu imóvel para venda com a Pallaro Seguros e Imóveis. Processo profissional, com análise da nossa equipe.",
      },
      { property: "og:title", content: "Anunciar Imóvel — Pallaro" },
      {
        property: "og:description",
        content:
          "Processo guiado em 6 etapas para anunciar seu imóvel à venda com a Pallaro Seguros e Imóveis.",
      },
    ],
  }),
  component: ListingFormPage,
});

const DEFAULTS: Partial<ListingFormValues> = {
  category: "residencial",
  subtype: "",
  title: "",
  state: "RS",
  city: "",
  neighborhood: "",
  address: "",
  number: "",
  complement: "",
  bedrooms: 0,
  suites: 0,
  bathrooms: 0,
  parkingSpots: 0,
  areaBuilt: 0,
  description: "",
  imageNames: [],
  features: {},
  condition: undefined as never,
  renovationStage: "nao_aplica",
  constructionStage: "nao_aplica",
  occupation: undefined as never,
  iptuMode: "mensal",
  iptuValue: 0,
  condoMode: "nao_isento",
  condoValue: 0,
  owners: [
    { name: "", document: "", phone: "", email: "", percentage: 100, notes: "" },
  ],
  captadores: [],
  keyAvailable: undefined as never,
  keyLocation: undefined as never,
  keyNotes: "",
  responsibleBroker: "Elio Pallaro",
  authorized: undefined as never,
  contractStart: "",
  contractDays: 180,
  minimumPrice: 0,
  commission: 6,
  negotiationNotes: "",
  acceptsFinancing: undefined as never,
  acceptsExchange: undefined as never,
  contractType: "exclusividade",
};

function ListingFormPage() {
  const [step, setStep] = useState<number>(1);
  const [maxReached, setMaxReached] = useState<number>(1);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const methods = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    mode: "onTouched",
    defaultValues: DEFAULTS,
    shouldUnregister: false,
  });

  // Hydrate from localStorage
  useEffect(() => {
    const saved = loadDraft();
    if (saved) {
      methods.reset({ ...DEFAULTS, ...saved } as ListingFormValues);
    }
    const s = loadStep();
    setStep(s);
    setMaxReached(s);
  }, [methods]);

  // Persist draft (debounced via watch)
  useEffect(() => {
    const sub = methods.watch((values) => {
      saveDraft(values as Partial<ListingFormValues>);
    });
    return () => sub.unsubscribe();
  }, [methods]);

  useEffect(() => {
    saveStep(step);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goTo = (n: number) => {
    if (n < 1 || n > STEPS.length) return;
    setStep(n);
    setMaxReached((m) => Math.max(m, n));
  };

  const handleNext = async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const ok = fields.length === 0 ? true : await methods.trigger(fields);
    if (!ok) {
      toast.error("Verifique os campos destacados antes de avançar.");
      return;
    }
    goTo(step + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const ok = await methods.trigger();
    if (!ok) {
      setSubmitting(false);
      toast.error("Há campos pendentes. Volte às etapas marcadas e complete antes de enviar.");
      return;
    }
    const values = methods.getValues();
    const submission = saveSubmission(values);
    clearDraft();
    setSubmitted(submission.id);
    setSubmitting(false);
  };

  if (submitted) {
    return <SuccessScreen id={submitted} />;
  }

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto max-w-5xl px-4 py-10 md:py-16">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Anunciar imóvel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Vamos cadastrar seu imóvel com a Pallaro
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Um processo guiado em 6 etapas, com a curadoria e o cuidado que só uma imobiliária
            tradicional da Serra Gaúcha pode oferecer.
          </p>
          <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> Análise profissional
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" /> Divulgação qualificada
            </li>
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Acompanhamento dedicado
            </li>
          </ul>
        </header>

        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            ref={cardRef}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-10"
          >
            <StepIndicator current={step} maxReached={maxReached} onJump={goTo} />

            <div className="mt-8">
              {step === 1 && <Step1MainData />}
              {step === 2 && <Step2Features />}
              {step === 3 && <Step3Details />}
              {step === 4 && <Step4OwnersKeys />}
              {step === 5 && <Step5Transaction />}
              {step === 6 && <Step6Review onJump={goTo} />}
            </div>

            <div className="mt-10">
              <StepNav
                current={step}
                total={STEPS.length}
                onBack={() => goTo(step - 1)}
                onNext={handleNext}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          </form>
        </FormProvider>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Seus dados são salvos automaticamente neste dispositivo enquanto você preenche o
          formulário.
        </p>
      </div>
    </div>
  );
}

function SuccessScreen({ id }: { id: string }) {
  return (
    <div className="bg-secondary/30 py-16">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Imóvel enviado para análise</h1>
        <p className="mt-3 text-muted-foreground">
          Seu imóvel foi enviado para análise. A equipe Pallaro entrará em contato para validar as
          informações e dar continuidade ao processo.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Protocolo interno: <span className="font-mono">{id.slice(0, 8)}</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/imoveis">Ver imóveis disponíveis</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
