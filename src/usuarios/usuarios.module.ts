import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AutorizacoesModule } from 'src/autorizacoes/auths.module';

@Module({
  imports: [ forwardRef(() => AutorizacoesModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
