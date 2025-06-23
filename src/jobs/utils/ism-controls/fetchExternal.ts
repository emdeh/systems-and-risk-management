import { writeFile, unlink } from "fs/promises";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.ISM_CONTROLS_JSON_URL!;
const OUT = process.env.ISM_CONTROLS_PATH!;

export async function fetchControls(): Promise<void> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const body = await res.text();
  await writeFile(resolve(process.cwd(), OUT), body, "utf-8");
}

export async function cleanupControls(): Promise<void> {
  try {
    await unlink(resolve(process.cwd(), OUT));
  } catch (err: any) {
    if (err.code !== "ENOENT") throw err;
  }
}
