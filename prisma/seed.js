import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  try {


    
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();