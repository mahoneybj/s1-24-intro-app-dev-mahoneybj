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
        tsunami: {
          create: {
            region: "Otago",
            size: 5, 
            duration: 600, 
            date: new Date(),
          },
          buildingDamage: {
            create: {
              houses_damaged: 25,
              houses_destroyed: 6,
              commerical_damaged: 54,
              commerical_destroyed: 2,
              cost: 3.6
            }
          },
          EEWInfo: {
            create: {
              alert_triggered: true,
              date: new Date(),
              region: "Otago",
              duration: 56,
              accuracy: 67.3
            }
          },
          Landslide: {
            create: {
              smallest: 2,
              largest: 54,
              region: "Otago",
              number: 32
            }
          }
        },
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