import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermutacoesService } from './permutacoes.service';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('permutacoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PermutacoesController {
  constructor(private readonly permutacoesService: PermutacoesService) {}

  @Get(':id')
  permutacaoUsuario(@Param('id') id: string){
    return this.permutacoesService.permutacaoUsuario(+id);
  }
}
