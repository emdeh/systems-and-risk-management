import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { fetchControls, cleanupControls } from "@/utils/fetchExternal";
import { importControls } from "./importISM";

const prisma = new PrismaClient();

async function main() {
  try {
    await fetchControls();
    await importControls();
    console.log("Controls imported successfully");
  } catch (e) {
    console.error("Import failed:", e);
    process.exit(1);
  } finally {
    await cleanupControls();
    await prisma.$disconnect();
  }
}

main();
