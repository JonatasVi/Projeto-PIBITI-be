import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthsGuard } from 'src/autorizacoes/auths.guard';
import { Usuario } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';


@UseGuards(AuthsGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}
  

  @Get()
  findAll() {
    return this.usersService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario | null> {
    return this.usersService.findOne(+id);
  }
 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }


  @Get('email/:email')
  buscarEmail(@Param('email') email: string): Promise<Usuario | null> {
    return this.usersService.buscarEmail(email);
  }


  @Delete(':id')
  remove(@Param('id') id: string): Promise<Usuario> {
    return this.usersService.remover(+id);
  }

  
}
