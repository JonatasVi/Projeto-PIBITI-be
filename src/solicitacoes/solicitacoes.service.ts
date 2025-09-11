import { Injectable, ConflictException } from '@nestjs/common';
import { CreateSolicitacoeDto, UpdateSolicitacoeDto } from './solicitacoes.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SolicitacoesService {
  constructor(private readonly prisma: PrismaService){}

  async create(createSolicitacoeDto: CreateSolicitacoeDto) {
    const solicitacaoExistente = await this.prisma.solicitacao.findFirst({
      where: {
        OR: [
          {
            usuarioId_solicitante: createSolicitacoeDto.usuarioId_solicitante,
            usuarioId_alvo: createSolicitacoeDto.usuarioId_alvo,
            status: { in: ['Pendente', 'Aceita'] }
          },
          {
            usuarioId_solicitante: createSolicitacoeDto.usuarioId_alvo,
            usuarioId_alvo: createSolicitacoeDto.usuarioId_solicitante,
            status: { in: ['Pendente', 'Aceita'] }
          }
        ]
      }
    });
    
    if (solicitacaoExistente) {
      throw new ConflictException('Já existe uma solicitação ativa entre esses usuários');
    }
    
    return this.prisma.solicitacao.create({
      data: {
        ...createSolicitacoeDto,
        status: 'Pendente'
      }
    });
  }

  async solicitacoesPendentes(id: number) {
    return this.prisma.solicitacao.findMany({
      where: {
        status: 'Pendente',
        usuarioId_alvo: id,
      },
      select:{
        id: true,
        usuarioSolicitante: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: true
          }
        }
      },
    });
  }

  async update(id: number, updateSolicitacoeDto: UpdateSolicitacoeDto) {
    return this.prisma.solicitacao.update({
      where: { id },
      data: updateSolicitacoeDto
    })
  }

  async buscarContatos(id: number) {
    return this.prisma.solicitacao.findMany({
      where: {
        status: 'Aceita',
        OR: [
          { usuarioId_solicitante: id },
          { usuarioId_alvo: id }
        ]
      },
      include: {
        usuarioSolicitante: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: true,
            email: true,
            telefone: true,
          }
        },
        usuarioAlvo: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: true,
            email: true,
            telefone: true,
          }
        }
      }
    });
  }

  async desconfirmarSolicitacao(usuarioIdSolicitante: number, usuarioIdAlvo: number) {
    return this.prisma.solicitacao.updateMany({
      where: {
        usuarioId_solicitante: usuarioIdSolicitante,
        usuarioId_alvo: usuarioIdAlvo,
        status: 'Aceita',
      },
      data: {
        status: 'Rejeitada',
      },
    });
  }

  async remove(id: number) {
    return this.prisma.solicitacao.delete({
      where: {id}
    });
  }

  async removerContato(usuario1Id: number, usuario2Id: number) {
    return this.prisma.solicitacao.deleteMany({
      where: {
        status: 'Aceita',
        OR: [
          {
            usuarioId_solicitante: usuario1Id,
            usuarioId_alvo: usuario2Id
          },
          {
            usuarioId_solicitante: usuario2Id,
            usuarioId_alvo: usuario1Id
          }
        ]
      }
    });
  }
}