import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()

export class PermutacoesService {
  constructor(private readonly prisma: PrismaService){}

  
  async permutacaoUsuario(id: number) {
    const usuarioId = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        instituicaoDestino: true
      }
    });

    if (!usuarioId) {
      throw new UnauthorizedException();
    }

    const instituicaoDest: number[] = usuarioId.instituicaoDestino
      .map(dest => dest.instituicaoId)
      .filter((id): id is number => id !== null);


    if (!usuarioId.instituicaoId) {
      return [];
    }

    return this.prisma.usuario.findMany({
      where: {
        instituicaoId: {
          in: instituicaoDest
        },
        instituicaoDestino: {
          some: {
            instituicaoId: usuarioId.instituicaoId
          }
        },
        cargo: usuarioId.cargo,
        NOT: {
          id: id
        }
      },
      select:{
			id: true,
			instituicao: true
		}
    });
	}
}

  

