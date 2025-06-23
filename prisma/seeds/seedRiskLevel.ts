// prisma/seeds/seedRiskLevel.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedRiskLevel() {

  await prisma.riskLevel.deleteMany();

  await prisma.riskLevel.createMany({
    data: [
      { id: 1, name: "Very Low",  rank: 1, color: "#00A000" },
      { id: 2, name: "Low",       rank: 2, color: "#80FF00" },
      { id: 3, name: "Medium",    rank: 3, color: "#FFFF00" },
      { id: 4, name: "High",      rank: 4, color: "#FF8000" },
      { id: 5, name: "Very High", rank: 5, color: "#FF4000" },
      { id: 6, name: "Extreme",   rank: 6, color: "#FF0000" },
    ]
  });
}
