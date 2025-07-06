import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermutacoesService } from './permutacoes.service';
import { CreatePermutacoeDto } from './permutacoes.dto';
import { UpdatePermutacoeDto } from './permutacoes-update.dto';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('permutacoes')
@ApiBearerAuth()
@UseGuards(AuthsGuard)
export class PermutacoesController {
  constructor(private readonly permutacoesService: PermutacoesService) {}

  
  @Get(':id')
  permutacaoUsuario(@Param('id') id: string){
    return this.permutacoesService.permutacaoUsuario(+id);
  }
}

25613