import { Injectable, UseGuards } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from 'src/database/prisma.service';
import { instituicao } from '@prisma/client';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';



@Injectable()
export class InstituicoesService {
  constructor(private readonly prisma: PrismaService){}
   
  @UseGuards(AuthsGuard)
  async criarInsitituicao(instituicao: CreateInstitutionDto): Promise<instituicao> {
    return this.prisma.instituicao.create({
      data: instituicao
    })
  }

  findAll() {
    return this.prisma.instituicao.findMany();
  }

  findOne(id: number) {
    return this.prisma.instituicao.findUnique({
      where: {id}
    })
  }

  async buscarIntituicaoUsuario(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {id}
    })

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const instituicoes = await this.prisma.instituicao.findMany({
      where: {
        id: { in: usuario.instituicaoDestino } 
      }
    });

    return instituicoes
  
    }
}
