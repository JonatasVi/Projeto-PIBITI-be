import {IsString, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    senha: string

    @IsString()
    cargo?: string

    @IsString()
    instituicaoAtual?: string

    @IsString()
    instituicaoDestino?: string

}

