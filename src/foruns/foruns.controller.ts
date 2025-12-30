import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForunsService } from './foruns.service';
import { CreateTopicoDto, UpdateTopicoDto, CreateComentarioDto, UpdateComentarioDto } from './forum.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';

@ApiTags('Fóruns') // Agrupa os endpoints no Swagger
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('foruns')
export class ForunsController {
  constructor(private readonly forunsService: ForunsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tópico', description: 'Cria um tópico principal no fórum.' })
  createTopico(@Body() topico: CreateTopicoDto) {
    return this.forunsService.createTopico(topico);
  }

  @Post('comentario')
  @ApiOperation({ summary: 'Adicionar comentário', description: 'Adiciona um comentário a um tópico existente.' })
  createComentario(@Body() comentario: CreateComentarioDto) {
    return this.forunsService.createComentario(comentario);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tópicos', description: 'Retorna uma lista de todos os tópicos do fórum.' })
  buscarTopicos() {
    return this.forunsService.buscarTopicos();
  }

  @Get('/comentarios/:id')
  @ApiOperation({ summary: 'Buscar comentários de um tópico', description: 'Retorna todos os comentários vinculados a um ID de tópico específico.' })
  buscarComentarios(@Param('id') id: string){
	  return this.forunsService.buscarComentarios(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tópico', description: 'Atualiza as informações de um tópico pelo ID.' })
  update(@Param('id') id: string, @Body() updateTopicoDto: UpdateTopicoDto) {
    return this.forunsService.update(+id, updateTopicoDto);
  }

  @Patch('/comentarios/:id_topico/:id_comentario')
  @ApiOperation({ summary: 'Atualizar um comentário', description: 'Atualiza o conteúdo de um comentário específico dentro de um tópico.' })
  atualizarComentario(
    @Param('id_topico') id_topico: string, 
    @Param('id_comentario') id_comentario: string, 
    @Body() updateComentarioDto: UpdateComentarioDto
  ) {
    return this.forunsService.atualizarComentario(+id_topico, +id_comentario, updateComentarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tópico', description: 'Exclui um tópico permanentemente.' })
  removerTopico(@Param('id') id: string) {
    return this.forunsService.removerTopico(+id);
  }

  @Delete('/comentario/:id')
  @ApiOperation({ summary: 'Remover um comentário', description: 'Exclui um comentário permanentemente pelo seu ID.' })
  removerComentario(@Param('id') id: string) {
    return this.forunsService.removerComentario(+id);
  }
}
