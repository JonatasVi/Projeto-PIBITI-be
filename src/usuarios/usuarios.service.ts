import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './usuarios.dto';
import { UpdateUserDto } from './usuarios-update.dto';
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
    const dataToUpdate: any = {};

    if (updateUserDto.nome) {
      dataToUpdate.nome = updateUserDto.nome;
    }
    if (updateUserDto.email) {
      dataToUpdate.email = updateUserDto.email;
    }
    if (updateUserDto.cargo) {
      dataToUpdate.cargo = updateUserDto.cargo;
    }

    if (updateUserDto.senha) {
      const salt = await bcrypt.genSalt();
      dataToUpdate.senha = await bcrypt.hash(updateUserDto.senha, salt);
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return this.prisma.usuario.findUnique({ where: { id } });
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
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
