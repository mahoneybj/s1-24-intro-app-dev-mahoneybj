-- CreateTable
CREATE TABLE "Earthquake" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "magnitude" DECIMAL(65,30) NOT NULL,
    "depth" DECIMAL(65,30) NOT NULL,
    "duration" DECIMAL(65,30) NOT NULL,
    "intensity" INTEGER NOT NULL,
    "fault_line" TEXT NOT NULL,
    "after_shock_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Earthquake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tsunami" (
    "id" SERIAL NOT NULL,
    "region" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "size" DECIMAL(65,30) NOT NULL,
    "duration" DECIMAL(65,30) NOT NULL,
    "earthquake_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tsunami_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingDamage" (
    "id" SERIAL NOT NULL,
    "houses_damaged" INTEGER NOT NULL,
    "houses_destroyed" INTEGER NOT NULL,
    "commerical_damaged" INTEGER NOT NULL,
    "commerical_destroyed" INTEGER NOT NULL,
    "earthquake_id" INTEGER NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildingDamage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EEWInfo" (
    "id" SERIAL NOT NULL,
    "alert_triggered" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "duration" DECIMAL(65,30) NOT NULL,
    "accuracy" DECIMAL(65,30) NOT NULL,
    "earthquake_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EEWInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Landslide" (
    "id" SERIAL NOT NULL,
    "smallest" DECIMAL(65,30) NOT NULL,
    "largest" DECIMAL(65,30) NOT NULL,
    "region" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "earthquake_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Landslide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorInfo" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "sensor_type" TEXT NOT NULL,
    "activate" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorEarthJoin" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "earthquake_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorEarthJoin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tsunami" ADD CONSTRAINT "Tsunami_earthquake_id_fkey" FOREIGN KEY ("earthquake_id") REFERENCES "Earthquake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingDamage" ADD CONSTRAINT "BuildingDamage_earthquake_id_fkey" FOREIGN KEY ("earthquake_id") REFERENCES "Earthquake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EEWInfo" ADD CONSTRAINT "EEWInfo_earthquake_id_fkey" FOREIGN KEY ("earthquake_id") REFERENCES "Earthquake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landslide" ADD CONSTRAINT "Landslide_earthquake_id_fkey" FOREIGN KEY ("earthquake_id") REFERENCES "Earthquake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorEarthJoin" ADD CONSTRAINT "SensorEarthJoin_earthquake_id_fkey" FOREIGN KEY ("earthquake_id") REFERENCES "Earthquake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorEarthJoin" ADD CONSTRAINT "SensorEarthJoin_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "SensorInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
