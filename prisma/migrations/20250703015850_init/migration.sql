/*
  Warnings:

  - The primary key for the `instituicaoDestino` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "instituicaoDestino" DROP CONSTRAINT "instituicaoDestino_instituicaoId_fkey";

-- DropIndex
DROP INDEX "instituicao_id_key";

-- AlterTable
ALTER TABLE "instituicaoDestino" DROP CONSTRAINT "instituicaoDestino_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "instituicaoId" DROP NOT NULL,
ADD CONSTRAINT "instituicaoDestino_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "imagePerfil" BYTEA,
ALTER COLUMN "instituicaoAtual" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "instituicaoDestino" ADD CONSTRAINT "instituicaoDestino_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
