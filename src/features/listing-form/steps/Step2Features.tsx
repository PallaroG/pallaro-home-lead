import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { FEATURE_GROUPS } from "../constants";
import type { ListingFormValues } from "../schema";

export function Step2Features() {
  const { watch, setValue } = useFormContext<ListingFormValues>();
  const features = (watch("features") as Record<string, boolean>) ?? {};
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!q) return FEATURE_GROUPS.map((g) => ({ ...g, items: [...g.items] }));
    return FEATURE_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((item) => item.toLowerCase().includes(q)),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  const openGroups = q ? filteredGroups.map((g) => g.id) : undefined;

  const toggle = (item: string, checked: boolean) => {
    setValue("features", { ...features, [item]: checked }, { shouldDirty: true });
  };

  const countSelected = (items: readonly string[]) =>
    items.reduce((acc, i) => acc + (features[i] ? 1 : 0), 0);

  const totalSelected = Object.values(features).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Características do imóvel</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecione tudo o que o imóvel oferece. Você selecionou{" "}
          <span className="font-semibold text-foreground">{totalSelected}</span> item(ns).
        </p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar característica (ex: piscina, sacada, mobiliado)"
          className="pl-9"
        />
      </div>

      <Accordion
        type="multiple"
        defaultValue={[FEATURE_GROUPS[0].id]}
        value={openGroups}
        className="w-full"
      >
        {filteredGroups.map((group) => {
          const selected = countSelected(group.items);
          return (
            <AccordionItem key={group.id} value={group.id} className="border-border">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-3">
                  <span className="text-base font-medium text-foreground">{group.label}</span>
                  {selected > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selected} selecionado{selected > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => {
                    const id = `feat-${group.id}-${item}`;
                    const checked = Boolean(features[item]);
                    return (
                      <label
                        key={item}
                        htmlFor={id}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-secondary/60"
                      >
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={(v) => toggle(item, v === true)}
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {filteredGroups.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Nenhuma característica encontrada para "{query}".
        </p>
      )}
    </div>
  );
}
