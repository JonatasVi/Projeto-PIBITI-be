-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "instituicaoAtual" INTEGER NOT NULL,
    "aceitaPerto" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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
    "usuarioId" INTEGER NOT NULL,
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "instituicaoDestino_pkey" PRIMARY KEY ("usuarioId","instituicaoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instituicao_id_key" ON "instituicao"("id");

-- AddForeignKey
ALTER TABLE "instituicaoDestino" ADD CONSTRAINT "instituicaoDestino_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instituicaoDestino" ADD CONSTRAINT "instituicaoDestino_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
