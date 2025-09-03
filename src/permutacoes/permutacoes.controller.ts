import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PermutacoesService } from './permutacoes.service';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';


@Controller('permutacoes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PermutacoesController {
  constructor(private readonly permutacoesService: PermutacoesService) {}

  @ApiOperation({ summary: 'Obtém todas as permutações disponiveis para o usuário' })
  @Get(':id')
  permutacaoUsuario(@Param('id') id: string){
    return this.permutacoesService.permutacaoUsuario(+id);
  }
}
