import type { ListingFormValues } from "./schema";

const KEY = "pallaro:listing-draft";
const STEP_KEY = "pallaro:listing-step";

export function loadDraft(): Partial<ListingFormValues> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<ListingFormValues>) : null;
  } catch {
    return null;
  }
}

export function saveDraft(values: Partial<ListingFormValues>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    /* noop */
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.localStorage.removeItem(STEP_KEY);
}

export function loadStep(): number {
  if (typeof window === "undefined") return 1;
  const raw = window.localStorage.getItem(STEP_KEY);
  const n = raw ? Number(raw) : 1;
  return Number.isFinite(n) && n >= 1 && n <= 6 ? n : 1;
}

export function saveStep(step: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STEP_KEY, String(step));
}
