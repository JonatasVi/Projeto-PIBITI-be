import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UnauthorizedException, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { AutorizacoesService } from './auths.service';
import { LoginDto } from './auths.dto';
import { CreateUserDto } from 'src/usuarios/usuarios.dto';
import { JwtAuthGuard } from '../autorizacoes/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';


@Controller('autorizacoes')
export class AutorizacoesController {
  constructor(private readonly autorizacoesService: AutorizacoesService) {}

  @ApiOperation({ summary: 'Obtém o token para ter acesso a todo o sistema' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginDto: LoginDto) {
    return this.autorizacoesService.signIn(loginDto.email, loginDto.senha);
  }


  @ApiOperation({ summary: 'Registra um usuário' })
  @Post('/register/')
  registrar(@Body() usuario: CreateUserDto) {
    return this.autorizacoesService.criarUsuario(usuario);
  }


  @ApiOperation({ summary: 'Obtém o token para o usuário' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req) {
    const usuario = await this.autorizacoesService.getUserProfileById(req.user.id);

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return usuario;
  }
}
