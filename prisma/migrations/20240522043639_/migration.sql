/*
  Warnings:

  - The `sensor_type` column on the `SensorInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('ACCELEROMETER', 'GEOPHONE', 'OTHER');

-- AlterTable
ALTER TABLE "SensorInfo" DROP COLUMN "sensor_type",
ADD COLUMN     "sensor_type" "SensorType" NOT NULL DEFAULT 'ACCELEROMETER';
