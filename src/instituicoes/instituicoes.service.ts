import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateInstitutionDto, UpdateInstitutionDto } from './instituicoes.dto';
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
    });
  }

  async findAll() {
    return this.prisma.instituicao.findMany();
  }

  async findOne(id: number) {
    return this.prisma.instituicao.findUnique({
      where: {id}
    });
  }
  
  async buscarInstituicao(nomeInstituicao: string){
    const instituicao = await this.prisma.instituicao.findMany({
      where: {
        nome: { contains: nomeInstituicao, mode: 'insensitive' }
      }
    });
    
    return instituicao;
 }
    
}
