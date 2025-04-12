import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/usuarios/dto/create-user.dto';

@Injectable()
export class AutorizacoesService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usersService.buscarEmail(email);
   
    
    if (!usuario || !(await bcrypt.compare(pass, usuario.senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario.email, id: usuario.id, nome: usuario.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }

  async register(usuario: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      usuario.senha,
      bcrypt.genSaltSync(),
    );
    const user = await this.usersService.criarUsuario({
      ...usuario,
      senha: hashedPassword,
    });
    return user;
  }

}
