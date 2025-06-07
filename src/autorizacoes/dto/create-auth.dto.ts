import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João Silva'
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha1234'
    })
    @IsString()
    @MinLength(6)
    senha: string;

    @ApiProperty({
        description: 'Cargo do usuário',
        example: 'usuario',
        required: false
    })
    @IsString()
    @IsOptional()
    cargo?: string;
}

export class LoginDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'usuario@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha1234'
    })
    @IsString()
    @MinLength(6)
    senha: string;
}