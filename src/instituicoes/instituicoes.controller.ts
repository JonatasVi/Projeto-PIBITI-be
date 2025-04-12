import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { instituicao } from '@prisma/client';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';

@Controller('instituicoes')
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
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(+id);
  }

  @Get('/instituicao/:id')
  InstitutionUser(@Param('id') id: string) {
      return this.institutionsService.buscarIntituicaoUsuario(+id);
  
    }

}
