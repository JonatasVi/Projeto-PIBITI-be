import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermutacoesService } from './permutacoes.service';
import { CreatePermutacoeDto } from './dto/create-permutacoe.dto';
import { UpdatePermutacoeDto } from './dto/update-permutacoe.dto';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';

@Controller('permutacoes')
@UseGuards(AuthsGuard)
export class PermutacoesController {
  constructor(private readonly permutacoesService: PermutacoesService) {}

  @Get('/permutacao/:id')
  permutacaoUsuario(@Param('id') id: string){
    return this.permutacoesService.permutacaoUsuario(+id);
  }
}
