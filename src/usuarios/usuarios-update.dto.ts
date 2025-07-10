import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './usuarios.dto';
import { IsOptional, IsString, IsEmail, MinLength, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  senha?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsNumber()
  instituicaoAtual?: number;

  @IsOptional()
  @IsArray()
  instituicaoDestino?: number[];

  @IsOptional()
  @IsBoolean()
  aceitaPerto?: boolean;
}