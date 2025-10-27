import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { CreateSolicitacoeDto, UpdateSolicitacoeDto } from './solicitacoes.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

  @ApiOperation({ summary: 'Cria uma solicitação' })
  @Post()
  create(@Body() createSolicitacoeDto: CreateSolicitacoeDto) {
    return this.solicitacoesService.create(createSolicitacoeDto);
  }

  @ApiOperation({ summary: 'Obtém todas as solicitações pendentes do usuario' })
  @Get(':id')
  buscarPendentes(@Param('id') id: string) {
    return this.solicitacoesService.solicitacoesPendentes(+id);
  }

  @ApiOperation({ summary: 'Obtém todos os contatos do usuários(solicitações aceitas)' })
  @Get('/contatos/:id')
  buscarContatos(@Param('id') id: string) {
    return this.solicitacoesService.buscarContatos(+id);
  }


  @ApiOperation({ summary: 'Atualiza uma solicitação' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSolicitacoeDto: UpdateSolicitacoeDto) {
    return this.solicitacoesService.update(+id, updateSolicitacoeDto);
  }

  @ApiOperation({ summary: 'desconfirmar uma solicitação' })
  @Put('/desconfirmar/:solicitanteId/:alvoId')
  desconfirmar(
    @Param('solicitanteId') solicitanteId: string,
    @Param('alvoId') alvoId: string
  ) {
    return this.solicitacoesService.desconfirmarSolicitacao(+solicitanteId, +alvoId);
  }

  @ApiOperation({ summary: 'Exclui uma solicitação' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitacoesService.remove(+id);
  }

  @ApiOperation({ summary: 'Excluir um contato (remover conexão entre usuários)' })
  @Delete('/contato/:usuario1Id/:usuario2Id')
  async removerContato(
    @Param('usuario1Id') usuario1Id: string,
    @Param('usuario2Id') usuario2Id: string
  ) {
    return this.solicitacoesService.removerContato(+usuario1Id, +usuario2Id);
  }
}