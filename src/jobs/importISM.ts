import { PrismaClient } from "@prisma/client";
import catalogJson from "../controls.json" assert { type: "json" };

import type { Catalog } from "@/types/catalog";
import { traverseGroups, hasApplicability } from "@/utils/catalogUtils";

const prisma = new PrismaClient();
const catalog = catalogJson as Catalog;

async function importControls() {
  const tasks: Promise<unknown>[] = [];

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

importControls()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect().then(() => process.exit(1));
  });
