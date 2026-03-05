import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connnectionString: process.env.PRISMA_DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
export default prisma;
