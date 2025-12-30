import { Injectable } from '@nestjs/common';
import { CreateTopicoDto, UpdateTopicoDto, CreateComentarioDto, UpdateComentarioDto } from './forum.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ForunsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTopico(createForumDto: CreateTopicoDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const topico = await prisma.topico.create({
        data: {
          nome: createForumDto.nome,
          categoria: createForumDto.categoria,
          usuario: {
            connect: {
              id: createForumDto.id_usuario,
            },
          },
        },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
              cargo: true,
              instituicao: true,
            },
          },
        },
      });

      // Criar o primeiro comentário vinculado ao tópico
      await prisma.comentario.create({
        data: {
          descricao: createForumDto.descricao!,
          topico: {
            connect: {
              id: topico.id,
            },
          },
          usuario: {
            connect: {
              id: createForumDto.id_usuario,
            },
          },
        },
      });

      return topico;
    });
  }

  async createComentario(createComentarioDto: CreateComentarioDto) {
    return await this.prisma.comentario.create({
      data: {
        descricao: createComentarioDto.descricao!,
        topico: {
          connect: {
            id: createComentarioDto.id_topico,
          },
        },
        usuario: {
          connect: {
            id: createComentarioDto.id_usuario,
          },
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            cargo: true,
            instituicao: true,
          },
        },
      },
    });
  }

  async buscarTopicos() {
    return this.prisma.topico.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            cargo: true,
            instituicao: true,
          },
        },
        comentarios: {
          take: 3, // Pegar apenas os 3 primeiros comentários para preview
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            usuario: {
              select: {
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            comentarios: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async buscarComentarios(id: number) {
    return this.prisma.comentario.findMany({
      where: {
        id_topico: id,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            cargo: true,
            instituicao: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async update(id: number, updateTopicoDto: UpdateTopicoDto) {
    return this.prisma.topico.update({
      where: { id },
      data: updateTopicoDto,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            cargo: true,
            instituicao: true,
          },
        },
      },
    });
  }

  async atualizarComentario(
    id_topico: number,
    id_comentario: number,
    updateComentarioDto: UpdateComentarioDto,
  ) {
    return this.prisma.comentario.update({
      where: { id: id_comentario },
      data: {
        descricao: updateComentarioDto.descricao,
        topico: {
          connect: {
            id: id_topico,
          },
        },
        usuario: {
          connect: {
            id: updateComentarioDto.id_usuario,
          },
        },
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            cargo: true,
            instituicao: true,
          },
        },
      },
    });
  }

  async removerTopico(id: number) {
    return this.prisma.topico.delete({
      where: { id },
    });
  }

  async removerComentario(id: number) {
    return this.prisma.comentario.delete({
      where: { id },
    });
  }
}
