import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PermutacoesService {
  constructor(private readonly prisma: PrismaService){}

  
  async permutacaoUsuario(id: number) {
    const usuarioId = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        instituicao: true
      }
    });

    if (!usuarioId) {
      throw new UnauthorizedException();
    }

    const instituicaoDest: number[] = usuarioId.instituicao
      .map(dest => dest.instituicaoId)
      .filter((id): id is number => id !== null);


    if (!usuarioId.instituicaoAtual) {
      return [];
    }

    return this.prisma.usuario.findMany({
      where: {
        instituicaoAtual: {
          in: instituicaoDest
        },
        instituicao: {
          some: {
            instituicaoId: usuarioId.instituicaoAtual
          }
        },
        NOT: {
          id: id
        }
      }
    });
}

    

  
  }

  

