import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstitutionDto, UpdateInstitutionDto } from './instituicoes.dto';
import { instituicao, usuario } from '@prisma/client';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('instituicoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InstituicoesController {
  constructor(private readonly institutionsService: InstituicoesService) {}

  @Post()
  create(@Body() instiuicao: CreateInstitutionDto): Promise<instituicao>{
    return this.institutionsService.criarInsitituicao(instiuicao);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }
  
  @Get('buscar/:string')
  buscarIntituicao(@Param('string') nome: string){
    return this.institutionsService.buscarInstituicao(nome);

  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<instituicao | null> {
    return this.institutionsService.findOne(+id);
  }

}
