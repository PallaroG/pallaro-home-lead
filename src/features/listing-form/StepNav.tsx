import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  current: number;
  total: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export function StepNav({ current, total, onBack, onNext, onSubmit, submitting }: Props) {
  const isLast = current === total;
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={current === 1}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>
      {isLast ? (
        <Button type="button" onClick={onSubmit} disabled={submitting} className="gap-2" size="lg">
          <Send className="h-4 w-4" />
          {submitting ? "Enviando..." : "Enviar imóvel para análise"}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} className="gap-2" size="lg">
          Próximo <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
