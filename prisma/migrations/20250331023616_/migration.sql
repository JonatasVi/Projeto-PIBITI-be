/*
  Warnings:

  - Added the required column `instituicaoAtual` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "instituicaoAtual",
ADD COLUMN     "instituicaoAtual" INTEGER NOT NULL;
