// Prisma client singleton
// Requires `npx prisma generate` to be run after schema changes
// The PrismaClient will be fully typed once prisma generate has been run

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaClientType = any;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

export const prisma: PrismaClientType =
  globalForPrisma.prisma ??
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  (require('@prisma/client').PrismaClient as PrismaClientType);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
