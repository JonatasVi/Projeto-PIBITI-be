import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTopicoDto {
	
	@ApiProperty({
        description: 'Nome do topico',
        example: 'Como funciona a Permutação'
    })
	@IsString()
	nome: string

	@ApiProperty({
        description: 'descricao do tipico e que é um comentario',
        example: 'Alguem poderia me explicar sobre a permutação'
    })
	@IsString()
	descricao?: string
	  
	@ApiProperty({
        description: 'categoria do topico',
        example: 'Off-topico'
    })
	@IsString()
	categoria: string

	@ApiProperty({
        description: 'ID do usuario que criou o topico',
        example: '1'
    })
	@IsNumber()
	id_usuario: number

}

export class CreateComentarioDto {
	
	@ApiProperty({
        description: 'descricao do tipico e que é um comentario',
        example: 'Alguem poderia me explicar sobre a permutação'
    })
	@IsString()
	descricao?: string

	@ApiProperty({
        description: 'ID do usuario que criou o topico',
        example: '1'
    })
	@IsNumber()
	id_usuario: number
	
	@ApiProperty({
        description: 'ID do usuario que criou o topico',
        example: '1'
    })
	@IsNumber()
	id_topico: number

}

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {}

export class UpdateTopicoDto extends PartialType(CreateTopicoDto) {}
