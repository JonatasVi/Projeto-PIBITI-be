/*
  Warnings:

  - The `instituicaoDestino` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "instituicaoDestino",
ADD COLUMN     "instituicaoDestino" INTEGER[];

-- CreateTable
CREATE TABLE "instituicao" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instituicao_id_key" ON "instituicao"("id");
