import { Module } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { InstituicoesController } from './instituicoes.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [InstituicoesController],
  providers: [InstituicoesService, PrismaService],
   exports: [InstituicoesService]
})
export class InstituicoesModule {}
