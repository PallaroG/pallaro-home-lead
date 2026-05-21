import { CheckCircle2 } from "lucide-react";
import { STEPS } from "./constants";
import { cn } from "@/lib/utils";

interface Props {
  current: number;
  maxReached: number;
  onJump: (step: number) => void;
}

export function StepIndicator({ current, maxReached, onJump }: Props) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground md:hidden">
        <span>
          Etapa {current} de {STEPS.length}
        </span>
        <span className="font-medium text-foreground">
          {STEPS[current - 1]?.title}
        </span>
      </div>

      <ol className="hidden grid-cols-6 gap-2 md:grid">
        {STEPS.map((s) => {
          const done = s.id < current;
          const active = s.id === current;
          const reachable = s.id <= maxReached;
          return (
            <li key={s.id}>
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onJump(s.id)}
                className={cn(
                  "group w-full text-left",
                  reachable ? "cursor-pointer" : "cursor-not-allowed opacity-60",
                )}
              >
                <div
                  className={cn(
                    "h-1 w-full rounded-full transition-colors",
                    active
                      ? "bg-primary"
                      : done
                        ? "bg-primary/70"
                        : "bg-border",
                  )}
                />
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : done
                          ? "border-primary/70 bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {done ? <CheckCircle2 className="h-3 w-3" /> : s.id}
                  </span>
                  <span
                    className={cn(
                      "truncate",
                      active ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.short}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border md:hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${(current / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
