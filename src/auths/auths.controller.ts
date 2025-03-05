import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LoginDto } from './dto/create-auth.dto';


@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body () loginDto: LoginDto){
    return this.authsService.signIn(loginDto.email,loginDto.senha)
  }

  
}
