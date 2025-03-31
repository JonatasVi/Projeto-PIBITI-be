/*
  Warnings:

  - Added the required column `sigla` to the `instituicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instituicao" ADD COLUMN     "sigla" TEXT NOT NULL;
