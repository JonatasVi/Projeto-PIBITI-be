import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthsModule } from './auths/auths.module';
import { InstitutionsModule } from './institutions/institutions.module';

@Module({
  imports: [UsersModule, AuthsModule, InstitutionsModule],
  providers: [PrismaService],
})
export class AppModule {}
