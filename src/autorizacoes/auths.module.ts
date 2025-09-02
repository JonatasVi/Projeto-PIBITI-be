import { forwardRef, Module } from '@nestjs/common';
import { AutorizacoesService } from './auths.service';
import { AutorizacoesController } from './auths.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [ forwardRef(() => UsuariosModule), JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY || '1234',
    signOptions: { expiresIn: '84600s' },
  }),],
  controllers: [AutorizacoesController],
  providers: [
    AutorizacoesService,
    UsuariosService,
    PrismaService,
    JwtStrategy
  ],
})
export class AutorizacoesModule {}