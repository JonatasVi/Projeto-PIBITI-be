import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './usuarios.dto';
import { PrismaService } from 'src/database/prisma.service';
import { usuario } from '@prisma/client';
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
    
    if (updateUserDto.email) {
      const userWithSameEmail = await this.prisma.usuario.findUnique({
        where: { email: updateUserDto.email },
      });

      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new ConflictException('Este email já está em uso por outro usuário');
      }
    }

    if (updateUserDto.senha && updateUserDto.senha.trim() !== '') {
      const salt = await bcrypt.genSalt();
      updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, salt);
    } else {
      delete updateUserDto.senha;
    }

    const instituicaoDestinoUsuario = updateUserDto.instituicaoDestino;

    if(instituicaoDestinoUsuario != undefined){
      await this.prisma.instituicaoDestino.deleteMany({
        where: {
          usuarioId: id
        }
      })
    }
    
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ...updateUserDto,
        instituicaoDestino: instituicaoDestinoUsuario ? {
          create: instituicaoDestinoUsuario.map(id => ({
            instituicao: {
              connect: { id }
            }
          }))
        } : undefined
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
