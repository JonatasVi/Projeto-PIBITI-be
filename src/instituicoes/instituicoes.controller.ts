import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Instituicao, Usuario } from '@prisma/client'; // Corrigido aqui
import { AuthsGuard } from 'src/autorizacoes/auths.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('instituicoes')
@ApiBearerAuth()
@UseGuards(AuthsGuard)
export class InstituicoesController {
  constructor(private readonly institutionsService: InstituicoesService) {}

  @Post()
  create(@Body() instiuicao: CreateInstitutionDto): Promise<Instituicao> { // Corrigido aqui
    return this.institutionsService.criarInsitituicao(instiuicao);
  }

  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Instituicao | null> { // Corrigido aqui
    return this.institutionsService.findOne(+id);
  }

  @Get('instituicaoUsuario/:id')
  instituicaoUsuario(@Param('id') id: string) {
    return this.institutionsService.instituicaoUsuario(+id);
  }

  @Get('instituicaoUsuarioDestino/:id')
  instituicaoUsuarioDestino(@Param('id') id: string) {
    return this.institutionsService.instituicaoUsuarioDestino(+id);
  }
}