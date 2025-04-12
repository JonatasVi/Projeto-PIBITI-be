import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePermutacoeDto } from './dto/create-permutacoe.dto';
import { UpdatePermutacoeDto } from './dto/update-permutacoe.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PermutacoesService {
  constructor(private readonly prisma: PrismaService){}

  async permutacaoUsuario(id: number){
    const usuarioId = await this.prisma.usuario.findUnique({
      where: {id}
    });

    if(!usuarioId){
      throw new UnauthorizedException()
    }

    return this.prisma.usuario.findMany({
      where: {
        instituicaoAtual: {
          in: usuarioId.instituicaoDestino  
        },
        instituicaoDestino: {
          has: usuarioId.instituicaoAtual  
        },
        cargo: usuarioId.cargo
      },
      select: {
        id: true
      }
      
    });

  }
}
