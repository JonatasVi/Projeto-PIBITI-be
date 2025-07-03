/*
  Warnings:

  - You are about to drop the column `profileImage` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "profileImage",
ADD COLUMN     "Image" TEXT;
