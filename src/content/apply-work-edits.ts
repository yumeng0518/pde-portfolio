import type { Project } from "./projects";
import geoPortal from "./work-edits/geo-portal.json";
import meilingAi from "./work-edits/meiling-ai-tools.json";
import flower from "./work-edits/flower-destination-recommend.json";
import foodCard from "./work-edits/food-play-card.json";
import frogWriting from "./work-edits/frog-writing-platform.json";

const editsBySlug: Record<string, Partial<Project>> = {
  "geo-portal": geoPortal as Partial<Project>,
  "meiling-ai-tools": meilingAi as Partial<Project>,
  "flower-destination-recommend": flower as Partial<Project>,
  "food-play-card": foodCard as Partial<Project>,
  "frog-writing-platform": frogWriting as Partial<Project>,
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeDeep<T>(base: T, patch: Partial<T>): T {
  if (!patch || typeof patch !== "object") return base;
  const result = { ...base } as T;

  for (const key of Object.keys(patch) as (keyof T)[]) {
    const patchValue = patch[key];
    const baseValue = base[key];

    if (patchValue === undefined) continue;

    if (Array.isArray(patchValue)) {
      result[key] = patchValue as T[keyof T];
      continue;
    }

    if (isPlainObject(patchValue) && isPlainObject(baseValue)) {
      result[key] = mergeDeep(baseValue, patchValue as Partial<typeof baseValue>);
      continue;
    }

    result[key] = patchValue as T[keyof T];
  }

  return result;
}

export function applyWorkEdits(project: Project): Project {
  const patch = editsBySlug[project.slug];
  if (!patch || Object.keys(patch).length === 0) return project;
  return mergeDeep(project, patch);
}
