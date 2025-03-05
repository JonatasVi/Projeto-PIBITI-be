import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const usuario = await this.usersService.findOne(email);
   
    
    if (!usuario || !(await bcrypt.compare(pass, usuario.senha))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: usuario.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }
}
