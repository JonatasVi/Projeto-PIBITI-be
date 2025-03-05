import { forwardRef, Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthsGuard } from './auths.guard';

@Module({
  imports: [ forwardRef(() => UsersModule), JwtModule.register({
    global: true,
    secret: process.env.SECRETE_KEY || '',
    signOptions: { expiresIn: '84600s' },
  }),],
  controllers: [AuthsController],
  providers: [AuthsService,AuthsGuard ,UsersService,PrismaService],
  exports: [AuthsGuard]
})
export class AuthsModule {}
