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
        Tsunami: {
          create: {
            region: "Otago",
            size: 5,
            duration: 600,
            date: new Date("2024-05-08T04:35:37.158Z")
          }
        },
        BuildingDamage: {
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
            date: new Date("2024-05-08T04:35:37.158Z"),
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
        },
        SensorInfo: {
          create: {
            location: "Dunedin",
            region: "Otago",
            sensor_type: "ADXL-355",
            activate: true
          }
        }
      },  
    });

      await prisma.earthquake.create({
        data: {
          date: new Date(), 
          magnitude: 5.2, 
          depth: 10.5, 
          duration: 30, 
          intensity: 5, 
          fault_line: "Alpine fault", 
          after_shock_id: null,
        }
      });

  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();