import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthsGuard } from 'src/auths/auths.guard';
import { validate } from 'class-validator';
import { Usuario } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<Usuario> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthsGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @UseGuards(AuthsGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario | null> {
    return this.usersService.findOne(id);
  }
 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthsGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Usuario> {
    return this.usersService.remover(+id);
  }
}
