/*
  Warnings:

  - Changed the type of `duration` on the `Tsunami` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tsunami" DROP COLUMN "duration",
ADD COLUMN     "duration" DECIMAL(65,30) NOT NULL;
