import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}


  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.prisma.usuario.findUnique({where:{email: createUserDto.email}})
    const hashPassword = await bcrypt.hash(createUserDto.senha, 10)
    if(checkEmail){
      throw new UnauthorizedException('Email ja esta em uso')
    }
    return this.prisma.usuario.create({
      data: { ...createUserDto,nome: createUserDto.email.split("@",1)[0],email: createUserDto.email, senha: hashPassword}
    })
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }
  

  async findOne(email: string) {
    return this.prisma.usuario.findUnique({
      where: {email}
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: {id},
      data: updateUserDto
    });
  }

  remover(id: number) {
    return this.prisma.usuario.delete({
      where: {id}
    });
  }
}
