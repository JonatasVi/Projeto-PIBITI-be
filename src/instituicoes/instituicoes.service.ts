import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Instituicao } from '@prisma/client';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';

@Injectable()
export class InstituicoesService {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(AuthsGuard)
  async criarInsitituicao(createInstitutionDto: CreateInstitutionDto): Promise<Instituicao> {
    return this.prisma.instituicao.create({
      data: createInstitutionDto
    });
  }

  async findAll(): Promise<Instituicao[]> {
    return this.prisma.instituicao.findMany();
  }

  async findOne(id: number): Promise<Instituicao | null> {
    return this.prisma.instituicao.findUnique({
      where: { id }
    });
  }

  async instituicaoUsuario(id: number): Promise<Instituicao> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id }
    });

    if (!usuario?.instituicaoAtual) {
      throw new NotFoundException('Instituição não encontrada para este usuário');
    }

    const instituicao = await this.prisma.instituicao.findUnique({
      where: { id: usuario.instituicaoAtual }
    });

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada');
    }

    return instituicao;
  }

  async instituicaoUsuarioDestino(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        instituicao: {
          select: {
            instituicao: true
          }
        }
      }
    });
  }
}