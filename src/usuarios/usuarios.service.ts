import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Usuario } from '@prisma/client'; // Changed from 'usuario' to 'Usuario'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number): Promise<Usuario | null> { // Updated return type
    return this.prisma.usuario.findUnique({
      where: { id }
    });
  }

  async buscarEmail(email: string): Promise<Usuario | null> { // Updated return type
    return this.prisma.usuario.findUnique({
      where: { email }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Usuario | null> { // Updated return type
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

  async remover(id: number): Promise<Usuario> { // Updated return type
    return this.prisma.usuario.delete({
      where: { id }
    });
  }
}