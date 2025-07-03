import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { usuario } from '@prisma/client';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService){}

  async findAll() {
    return this.prisma.usuario.findMany()
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


    return this.prisma.usuario.update({
      where: { id },
      data: {
        nome: updateUserDto.nome,
        cargo: updateUserDto.cargo,
        email: updateUserDto.email,
        senha: updateUserDto.senha, 
        instituicaoAtual: updateUserDto.instituicaoAtual,
        aceitaPerto: updateUserDto.aceitaPerto,
        instituicao: {
          create: updateUserDto.instituicaoDestino?.map(id => ({
            instituicao: {
              connect: { id }
            }
          }))
        }
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
