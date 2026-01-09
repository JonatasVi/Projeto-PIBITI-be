import { Module } from '@nestjs/common';
import { ForunsService } from './foruns.service';
import { ForunsController } from './foruns.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [ForunsController],
  providers: [ForunsService,PrismaService],
  exports: [ForunsService]
})
export class ForunsModule {}
