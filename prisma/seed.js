import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.earthquake.create({
      data: {
        date: new Date(), 
        magnitude: 5.2, 
        depth: 10.5, 
        duration: 30, 
        intensity: 5, 
        fault_line: "Alpine fault", 
        after_shock_id: null, 
      },
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();