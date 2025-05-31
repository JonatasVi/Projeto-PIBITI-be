import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/usuarios/dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { usuario } from '@prisma/client';

@Injectable()
export class AutorizacoesService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usersService.buscarEmail(email);
   
    
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const isPasswordValid = await bcrypt.compare(pass, usuario.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: usuario.id, nome: usuario.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }

  async criarUsuario(usuario: CreateUserDto): Promise<usuario> {
     const checkEmail = await this.usersService.buscarEmail(usuario.email);
      
      const salt = bcrypt.genSaltSync();
      const hashPassword = await bcrypt.hash(usuario.senha,salt);
      if(checkEmail){
        throw new ConflictException('Email ja esta em uso')
      }
      return this.prisma.usuario.create({
         data: {
          nome: usuario.nome,
          email: usuario.email,
          senha: hashPassword,
          cargo: usuario.cargo,
    }
  })
    }

  }
  
