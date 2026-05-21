import type { PropertySubmission } from "@/types/property";

const STORAGE_KEY = "pallaro:submissions";

export function saveSubmission(draft: unknown): PropertySubmission {
  const full: PropertySubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_review",
    draft,
  };
  if (typeof window === "undefined") return full;
  const all = listSubmissions();
  all.push(full);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return full;
}

export function listSubmissions(): PropertySubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PropertySubmission[]) : [];
  } catch {
    return [];
  }
}
