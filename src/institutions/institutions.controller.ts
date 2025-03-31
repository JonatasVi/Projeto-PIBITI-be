import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { instituicao } from '@prisma/client';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(@Body() instiuicao: CreateInstitutionDto): Promise<instituicao>{
    return this.institutionsService.createInsitituicao(instiuicao);
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
