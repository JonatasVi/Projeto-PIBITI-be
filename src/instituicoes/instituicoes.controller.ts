import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstitutionDto } from './instituicoes.dto';
import { UpdateInstitutionDto } from './instituicao-update.dto';
import { instituicao, usuario } from '@prisma/client';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('instituicoes')
@ApiBearerAuth()
@UseGuards(AuthsGuard)
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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<instituicao | null> {
    return this.institutionsService.findOne(+id);
  }

  @Get('instituicaoUsuario/:id')
  instituicaoUsuario(@Param('id') id: string){
    return this.institutionsService.instituicaoUsuario(+id);
  }


  @Get('instituicaoUsuarioDestino/:id')
  instituicaoUsuarioDestino(@Param('id') id: string){
    return this.institutionsService.instituicaoUsuarioDestino(+id);
  }


}
