import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './usuarios.dto';
import { PrismaService } from 'src/database/prisma.service';
import { usuario, instituicaoDestino } from '@prisma/client';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService){}

  async findAll() {
    return this.prisma.usuario.findMany({
      include: {
        instituicao: true,
        instituicaoDestino: {
          include: {
            instituicao: true
          }
        }
      }
    });
  }

  async findOne(id: number): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where: {id}
    });
  }

  async buscarEmail(email: string): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where: {email}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<usuario | null> {
    
    // Validação de e-mail duplicado
    if (updateUserDto.email) {
      const userWithSameEmail = await this.prisma.usuario.findUnique({
        where: { email: updateUserDto.email },
      });

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException('Este email já está em uso por outro usuário');
      }
    }

    // ✨ CORREÇÃO PRINCIPAL ✨
    // Verifica se a senha foi enviada E se ela não é uma string vazia.
    if (updateUserDto.senha && updateUserDto.senha.trim() !== '') {
      // Se a senha for válida, criptografa.
      const salt = await bcrypt.genSalt();
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, salt);
    } else {
      // Se a senha for vazia, nula ou undefined, REMOVE a propriedade do objeto.
      // Isso impede que o Prisma tente atualizar a senha para um valor vazio.
      delete updateUserDto.senha;
    }

    const instituicaoDestinoUsuario = updateUserDto.instituicaoDestino;

    // Se uma nova lista de instituições de destino foi enviada,
    // remove as antigas primeiro.
    if(instituicaoDestinoUsuario != undefined){
      await this.prisma.instituicaoDestino.deleteMany({
        where: {
          usuarioId: id
        }
      })
    }
    
    // Atualiza o usuário no banco de dados
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...updateUserDto,
        // Apenas tenta criar o relacionamento se a lista `instituicaoDestinot` for fornecida
        instituicaoDestino: instituicaoDestinoUsuario ? {
          create: instituicaoDestinoUsuario.map(id => ({
            instituicao: {
              connect: { id }
            }
          }))
        } : undefined // Se não for fornecida, não faz nada com o relacionamento
      }
    });
  }


  async remover(id: number): Promise<usuario> {
    return this.prisma.usuario.delete({
      where: {id}
    });
  }


  async uploadProfileImage(userId: number, imageBuffer: Buffer) {
    return this.prisma.usuario.update({
      where: { id: userId },
      data: {
        imagePerfil: imageBuffer,
      },
    });
  }

  async getProfileImage(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: { imagePerfil: true },
    });
    return user?.imagePerfil ?? null;
  }
   
}
