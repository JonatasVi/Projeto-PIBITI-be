import { Injectable } from '@nestjs/common';
import { CreateSolicitacoeDto, UpdateSolicitacoeDto } from './solicitacoes.dto';
import { PrismaService } from 'src/database/prisma.service';
import { solicitacao, usuario } from '@prisma/client';

@Injectable()
export class SolicitacoesService {
  constructor(private readonly prisma: PrismaService){}

  create(createSolicitacoeDto: CreateSolicitacoeDto) {
    return this.prisma.solicitacao.create({
      data: createSolicitacoeDto
    });
  }

  findAll() {
    return this.prisma.solicitacao.findMany();
  }

  async solicitacoesPendentes(id: number) {

    return  this.prisma.solicitacao.findMany({
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

  async buscarContatos(id: number){
    return this.prisma.solicitacao.findMany({
      where: {
        status: 'Aceita'
      },
      select: {
        usuarioSolicitante: {
          select: {
            id: true,
            nome: true,
            cargo: true,
            instituicao: true,
            email: true
          }
        }
      },
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

  remove(id: number) {
    return this.prisma.solicitacao.delete({
      where: {id}
    });
  }
}
