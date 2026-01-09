import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutorizacoesModule } from './autorizacoes/auths.module';
import { InstituicoesModule } from './instituicoes/instituicoes.module';
import { PermutacoesModule } from './permutacoes/permutacoes.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { ForunsModule } from './foruns/foruns.module';


@Module({
  imports: [UsuariosModule,ForunsModule, AutorizacoesModule, InstituicoesModule, PermutacoesModule, SolicitacoesModule, ForunsModule],
  providers: [PrismaService],
})
export class AppModule {}
