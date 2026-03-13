import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connnectionString: process.env.PRISMA_DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
export default prisma;
// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient({});

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
