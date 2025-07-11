import { ApiProperty } from '@nestjs/swagger'
import {IsString, IsEmail, MinLength, IsArray, IsNumber, IsOptional, IsBoolean } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuario',
        example: 'Fulano'
    })
    @IsString()
    nome: string

    @ApiProperty({
        description: 'E-mail que sera usado para login',
        example: 'usuario@gmail.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'Senha para o Usuario',
        example: 'senha1234'
    })
    @IsString()
    @MinLength(8)
    senha: string

    @ApiProperty({
        description: 'Aqui sera inserido o cargo que o usuario exerce na instituicao',
        example: 'Tecnico de Laboratorio'
    })
    @IsString()
    cargo: string

    @ApiProperty({
        description: 'Aqui reference a instituicao atual do usuario',
        example: '1'
    })
    @IsNumber()
    @IsOptional()
    instituicaoId?: number

    @ApiProperty({
        description: 'Aqui reference as instituicoes de destino do usuario que no caso e um array de numero que corresponderar com os ids da instituicoes',
        example: []
    })
    @IsArray()
    @IsOptional()
    instituicaoDestino: number[]

    @IsOptional()
    aceitaPerto: boolean
    
    @IsOptional()
	 @IsString()
	 perfilimage?: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
}

