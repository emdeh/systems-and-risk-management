import type { Group, Control } from "@/shared/types/catalog";

export function traverseGroups(
  groups: Group[],
  handler: (
    guideline: string,
    section: string,
    topic: string,
    control: Control
  ) => void,
  titles: string[] = []
): void {
  for (const g of groups || []) {
    const next = [...titles, g.title ?? ""];
    for (const c of g.controls || []) {
      handler(next[0], next[1], next[2], c);
    }
    traverseGroups(g.groups || [], handler, next);
  }
}

export const hasApplicability = (list: string[], v: string): boolean =>
  list.includes(v);
