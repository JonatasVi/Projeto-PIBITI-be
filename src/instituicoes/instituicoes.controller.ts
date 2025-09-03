import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstitutionDto } from './instituicoes.dto';
import { instituicao } from '@prisma/client';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('instituicoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InstituicoesController {
  constructor(private readonly institutionsService: InstituicoesService) {}

  @ApiOperation({ summary: 'Cria uma instituição' })
  @Post()
  create(@Body() instiuicao: CreateInstitutionDto): Promise<instituicao>{
    return this.institutionsService.criarInsitituicao(instiuicao);
  }

  @ApiOperation({ summary: 'Obtém todas as instituções' })
  @Get()
  findAll() {
    return this.institutionsService.findAll();
  }
  
  @ApiOperation({ summary: 'Busca uma instituição ou mais de acordo com o nome' })
  @Get('buscar/:string')
  buscarIntituicao(@Param('string') nome: string){
    return this.institutionsService.buscarInstituicao(nome);
  }

  @ApiOperation({ summary: 'Busca uma instituição pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<instituicao | null> {
    return this.institutionsService.findOne(+id);
  }

}
