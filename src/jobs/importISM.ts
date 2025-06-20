import { PrismaClient } from "@prisma/client";
import catalog from "../controls.json" assert { type: "json" };

const prisma = new PrismaClient();

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

type Group = { title?: string; groups?: Group[]; controls?: any[] };

/**
 * Walks the nested groups structure, passing each control to `handler`.
 * `handler` is synchronous (we collect its async work separately).
 */
function traverse(
  groups: Group[],
  handler: (guideline: string, section: string, topic: string, control: any) => void,
  titles: string[] = []
) {
  for (const g of groups ?? []) {
    const next = [...titles, g.title ?? ""];
    for (const c of g.controls ?? []) {
      handler(next[0], next[1], next[2], c);
    }
    traverse(g.groups ?? [], handler, next);
  }
}

const has = (list: string[], v: string) => list.includes(v);

/* ------------------------------------------------------------------ */
/* Main import routine                                                */
/* ------------------------------------------------------------------ */

async function main() {
  const promises: Promise<void>[] = [];

  traverse(catalog.catalog.groups, (guideline, section, topic, control) => {
    // schedule each branch's async work
    promises.push((async () => {
      // 1) Upsert Guideline
      const g = await prisma.guideline.upsert({
        where: { title: guideline },
        create: { title: guideline },
        update: {},
      });

      // 2) Upsert Section
      const s = await prisma.section.upsert({
        where: { title_guidelineId: { title: section, guidelineId: g.id } },
        create: { title: section, guidelineId: g.id },
        update: {},
      });

      // 3) Upsert Topic
      const t = await prisma.topic.upsert({
        where: { title_sectionId: { title: topic, sectionId: s.id } },
        create: { title: topic, sectionId: s.id },
        update: {},
      });

      // 4) Extract properties
      const props = control.props ?? [];
      const appl  = props.filter((p: any) => p.name === "applicability").map((p: any) => p.value);
      const e8    = props.filter((p: any) => p.name === "essential-eight-applicability").map((p: any) => p.value);
      const rev   = props.find((p: any) => p.name === "revision")?.value;
      const upd   = props.find((p: any) => p.name === "updated")?.value;
      const stmt  = control.parts?.find((p: any) => p.name === "statement")?.prose ?? "";

      // 5) Upsert Control
      await prisma.control.upsert({
        where: { identifier: control.id },
        create: {
          identifier: control.id,
          revision: rev ? parseInt(rev, 10) : null,
          updatedRaw: upd ?? null,
          description: stmt,
          topicId: t.id,
          NC:  has(appl, "NC"),
          OS:  has(appl, "OS"),
          P:   has(appl, "P"),
          S:   has(appl, "S"),
          TS:  has(appl, "TS"),
          ML1: has(e8, "ML1"),
          ML2: has(e8, "ML2"),
          ML3: has(e8, "ML3"),
        },
        update: {
          revision: rev ? parseInt(rev, 10) : null,
          updatedRaw: upd ?? null,
          description: stmt,
          lastSynced: new Date(),
          NC:  has(appl, "NC"),
          OS:  has(appl, "OS"),
          P:   has(appl, "P"),
          S:   has(appl, "S"),
          TS:  has(appl, "TS"),
          ML1: has(e8, "ML1"),
          ML2: has(e8, "ML2"),
          ML3: has(e8, "ML3"),
        },
      });
    })());
  });

  // wait for all the upserts to finish
  await Promise.all(promises);
}

/* ------------------------------------------------------------------ */
/* Execute & clean up                                                 */
/* ------------------------------------------------------------------ */

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
