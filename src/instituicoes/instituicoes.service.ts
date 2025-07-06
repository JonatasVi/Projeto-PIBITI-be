import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateInstitutionDto } from './instituicoes.dto';
import { UpdateInstitutionDto } from './instituicao-update.dto';
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

  async findAll() {
    return this.prisma.instituicao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.instituicao.findUnique({
      where: {id}
    })
  }

  async instituicaoUsuario(id: number){
    const usuario = await this.prisma.usuario.findUnique({
      where: {id}
    })

    if (!usuario?.instituicaoAtual) {
      throw new NotFoundException('Instituição não encontrada para este usuário');
    }

    return this.prisma.instituicao.findUnique({
      where: {id: usuario?.instituicaoAtual}
    })

  }
  
  async instituicaoUsuarioDestino(id: number){

    return this.prisma.usuario.findUnique({
      where: {id},
      select:{
      id: true,
      instituicao: {
      select: {
        instituicao: true
      }
     }
  }
  })


  }


    
}
