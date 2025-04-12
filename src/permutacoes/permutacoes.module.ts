import { Module } from '@nestjs/common';
import { PermutacoesService } from './permutacoes.service';
import { PermutacoesController } from './permutacoes.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PermutacoesController],
  providers: [PermutacoesService, PrismaService],
  exports: [PermutacoesService]
})
export class PermutacoesModule {}
