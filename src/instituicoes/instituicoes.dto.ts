import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, isString, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class CreateInstitutionDto {
    @ApiProperty({
        description: 'ID da instituicao',
        example: '1'
    })
    @IsNumber()
    id: number

    @ApiProperty({
        description: 'nome da instituicao',
        example: 'Universidade Federal de Rondônia'
    })
    @IsString()
    nome: string

    @ApiProperty({
        description: 'municipio da instituicao',
        example: 'Porto Velho'
    })
    @IsString()
    municipio: string

    @ApiProperty({
        description: 'uf do estado da instituicao',
        example: 'RO'
    })
    @IsString()
    uf: string

    @ApiProperty({
        description: 'sigla da instituicao',
        example: 'UNIR'
    })
    @IsString()
    sigla: string

}

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {}
