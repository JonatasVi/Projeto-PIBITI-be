/*
  Warnings:

  - You are about to drop the column `perfilimage` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "perfilimage",
ADD COLUMN     "imagePerfil" BYTEA;
