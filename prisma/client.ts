import { PrismaClient } from "@prisma/client";

// original code
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// new code
// const prisma = new PrismaClient();

// original code
export default prisma;

// original code
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
