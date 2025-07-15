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

// Módulos nativos do Node.js
import * as fs from 'fs';
import * as path from 'path';

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

  // O decorador @Header foi REMOVIDO daqui
  @Get(':id/foto')
  async getImagem(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response, // Injeta a resposta para controle manual
  ) {
    const imagemBuffer = await this.usersService.getProfileImage(id);

    // Se a imagem do usuário existir, define o header e a retorna
    if (imagemBuffer) {
      // Define o header SÓ AQUI, garantindo que o tipo corresponde ao corpo
      res.setHeader('Content-Type', 'image/jpeg'); 
      return new StreamableFile(imagemBuffer);
    }

    // Se a imagem NÃO existir, tenta retornar a imagem padrão
    try {
      const defaultImagePath = path.join(process.cwd(), 'src', 'assets', 'default-avatar.png');
      const defaultImageBuffer = fs.readFileSync(defaultImagePath);

      // Define o header para o tipo da imagem padrão
      res.setHeader('Content-Type', 'image/png'); 
      return new StreamableFile(defaultImageBuffer);

    } catch (error) {
      // Se nem a imagem padrão for encontrada, lança um erro.
      // Como nenhum header foi setado, o NestJS usará o Content-Type de JSON padrão.
      throw new NotFoundException('Imagem do usuário e imagem padrão não encontradas.');
    }
  }
}