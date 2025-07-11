-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "instituicaoId" INTEGER,
    "aceitaPerto" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagePerfil" BYTEA,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instituicao" (
    "id" INTEGER NOT NULL,
    "nome" TEXT,
    "municipio" TEXT,
    "uf" TEXT,
    "sigla" TEXT,

    CONSTRAINT "instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instituicaoDestino" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "instituicaoId" INTEGER,

    CONSTRAINT "instituicaoDestino_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instituicaoDestino" ADD CONSTRAINT "instituicaoDestino_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instituicaoDestino" ADD CONSTRAINT "instituicaoDestino_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
