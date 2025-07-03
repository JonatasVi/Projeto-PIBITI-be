/*
  Warnings:

  - You are about to drop the column `Image` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT;
