import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import path from "path";
import type { Catalog } from "@/shared/types/catalog";
import { traverseGroups, hasApplicability } from "@/jobs/utils/ism-controls/catalogUtils";

export async function importControls(): Promise<void> {
  
  // 1) Read the fetched JSON file
  const filePath = path.resolve(process.cwd(), process.env.ISM_CONTROLS_PATH!);
  const raw = await readFile(filePath, "utf-8");
  const catalog: Catalog = JSON.parse(raw);

  // 2) Proceed using `catalog.catalog.groups`
  const prisma = new PrismaClient();
  const tasks: Promise<void>[] = [];
  traverseGroups(catalog.catalog.groups, (guideline, section, topic, control) => {
  
    tasks.push(
      
      (async () => {
        // — Upsert Guideline
        const g = await prisma.guideline.upsert({
          where: { title: guideline },
          create: { title: guideline },
          update: {},
        });

        // — Upsert Section
        const s = await prisma.section.upsert({
          where: { title_guidelineId: { title: section, guidelineId: g.id } },
          create: { title: section, guidelineId: g.id },
          update: {},
        });

        // — Upsert Topic
        const t = await prisma.topic.upsert({
          where: { title_sectionId: { title: topic, sectionId: s.id } },
          create: { title: topic, sectionId: s.id },
          update: {},
        });

        // — Extract properties
        const props = control.props ?? [];
        const appl = props.filter(p => p.name === "applicability").map(p => p.value);
        const e8   = props.filter(p => p.name === "essential-eight-applicability").map(p => p.value);
        const rev  = props.find(p => p.name === "revision")?.value;
        const upd  = props.find(p => p.name === "updated")?.value;
        const stmt = control.parts?.find(p => p.name === "statement")?.prose ?? "";

        // — Upsert Control
        await prisma.control.upsert({
          where: { identifier: control.id },
          create: {
            identifier: control.id,
            revision: rev ? parseInt(rev, 10) : null,
            updatedRaw: upd ?? null,
            description: stmt,
            topicId: t.id,
            NC:  hasApplicability(appl, "NC"),
            OS:  hasApplicability(appl, "OS"),
            P:   hasApplicability(appl, "P"),
            S:   hasApplicability(appl, "S"),
            TS:  hasApplicability(appl, "TS"),
            ML1: hasApplicability(e8,  "ML1"),
            ML2: hasApplicability(e8,  "ML2"),
            ML3: hasApplicability(e8,  "ML3"),
          },
          update: {
            revision: rev ? parseInt(rev, 10) : null,
            updatedRaw: upd ?? null,
            description: stmt,
            lastSynced: new Date(),
            NC:  hasApplicability(appl, "NC"),
            OS:  hasApplicability(appl, "OS"),
            P:   hasApplicability(appl, "P"),
            S:   hasApplicability(appl, "S"),
            TS:  hasApplicability(appl, "TS"),
            ML1: hasApplicability(e8,  "ML1"),
            ML2: hasApplicability(e8,  "ML2"),
            ML3: hasApplicability(e8,  "ML3"),
          },
        });
      })() // ← **Note the () here**: this invokes the async arrow, returning a Promise<void>
    );
  });

  await Promise.all(tasks);
}