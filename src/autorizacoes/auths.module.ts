import { forwardRef, Module } from '@nestjs/common';
import { AutorizacoesService } from './auths.service';
import { AutorizacoesController } from './auths.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthsGuard } from './auths.guard';

@Module({
  imports: [ forwardRef(() => UsuariosModule), JwtModule.register({
    global: true,
    secret: process.env.SECRETE_KEY || '',
    signOptions: { expiresIn: '84600s' },
  }),],
  controllers: [AutorizacoesController],
  providers: [AutorizacoesService,AuthsGuard ,UsuariosService,PrismaService],
  exports: [AuthsGuard]
})
export class AutorizacoesModule {}
