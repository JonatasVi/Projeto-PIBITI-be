import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUserDto } from './usuarios.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { usuario } from '@prisma/client';
import { StreamableFile,  } from '@nestjs/common';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';

@Controller('usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<usuario | null> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Get('email/:email')
  buscarEmail(@Param('email') email: string): Promise<usuario | null> {
    return this.usersService.buscarEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<usuario> {
    return this.usersService.remover(+id);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|jpg)$/)) {
          cb(new BadRequestException('Apenas arquivos de imagem são permitidos!'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async uploadFoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    await this.usersService.uploadProfileImage(id, file.buffer);
    return { message: 'Imagem enviada com sucesso!' };
  }

  @Get(':id/foto')
  async getImagem(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const imagem = await this.usersService.getProfileImage(id);
    if (!imagem) throw new NotFoundException('Imagem não encontrada');

    return new StreamableFile(imagem, {
      type: 'image/jpeg',
    });
  }
}
