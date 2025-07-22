import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutorizacoesModule } from './autorizacoes/auths.module';
import { InstituicoesModule } from './instituicoes/instituicoes.module';
import { PermutacoesModule } from './permutacoes/permutacoes.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';


@Module({
  imports: [UsuariosModule, AutorizacoesModule, InstituicoesModule, PermutacoesModule, SolicitacoesModule],
  providers: [PrismaService],
})
export class AppModule {}
