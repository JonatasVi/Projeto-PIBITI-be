import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { CreateSolicitacoeDto, UpdateSolicitacoeDto } from './solicitacoes.dto';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

  @Post()
  create(@Body() createSolicitacoeDto: CreateSolicitacoeDto) {
    return this.solicitacoesService.create(createSolicitacoeDto);
  }

  @Get()
  findAll() {
    return this.solicitacoesService.findAll();
  }
  status
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitacoesService.solicitacoesPendentes(+id);
  }

  @Get('/contatos/:id')
  buscarContatos(@Param('id') id: string) {
    return this.solicitacoesService.buscarContatos(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSolicitacoeDto: UpdateSolicitacoeDto) {
    return this.solicitacoesService.update(+id, updateSolicitacoeDto);
  }

  @Put('/desconfirmar/:solicitanteId/:alvoId')
  desconfirmar(
    @Param('solicitanteId') solicitanteId: string,
    @Param('alvoId') alvoId: string
  ) {
    return this.solicitacoesService.desconfirmarSolicitacao(+solicitanteId, +alvoId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitacoesService.remove(+id);
  }
}
