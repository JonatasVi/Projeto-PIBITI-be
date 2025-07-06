import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AutorizacoesService } from './auths.service';
import { LoginDto } from './auths.dto';
import { CreateUserDto } from 'src/usuarios/usuarios.dto';


@Controller('autorizacoes')
export class AutorizacoesController {
  constructor(private readonly autorizacoesService: AutorizacoesService) {}

  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body () loginDto: LoginDto){
    return this.autorizacoesService.signIn(loginDto.email,loginDto.senha)
  }

  @Post('/register/')
  registrar(@Body () usuario: CreateUserDto){
    return this.autorizacoesService.criarUsuario(usuario);
  }


}
