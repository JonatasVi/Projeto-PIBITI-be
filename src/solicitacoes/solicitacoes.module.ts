import { Module } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService, PrismaService],
  exports: [SolicitacoesService]
})
export class SolicitacoesModule {}
