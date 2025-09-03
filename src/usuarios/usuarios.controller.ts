import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  NotFoundException,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUserDto } from './usuarios.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { usuario } from '@prisma/client';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import * as fs from 'fs';
import * as path from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller('usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @ApiOperation({ summary: 'Obtém todos os usuários' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtém um usuário pelo id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<usuario | null> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza um usuário pelo id' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Busca um usuário pelo email' })
  @Get('email/:email')
  buscarEmail(@Param('email') email: string): Promise<usuario | null> {
    return this.usersService.buscarEmail(email);
  }

  @ApiOperation({ summary: 'Exclui um usuário pelo id' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<usuario> {
    return this.usersService.remover(+id);
  }

  @ApiOperation({ summary: 'Para fazer o upload da imagem de perfil' })
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


  @ApiOperation({ summary: 'Obtém a foto de perfil do usuário' })
  @Get(':id/foto')
  async getImagem(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response, 
  ) {
    const imagemBuffer = await this.usersService.getProfileImage(id);

    if (imagemBuffer) {
      res.setHeader('Content-Type', 'image/jpeg'); 
      return new StreamableFile(imagemBuffer);
    }

    try {
      const defaultImagePath = path.join(process.cwd(), 'src', 'assets', 'default-avatar.png');
      const defaultImageBuffer = fs.readFileSync(defaultImagePath);

      res.setHeader('Content-Type', 'image/png'); 
      return new StreamableFile(defaultImageBuffer);

    } catch (error) {
      throw new NotFoundException('Imagem do usuário e imagem padrão não encontradas.');
    }
  }
}