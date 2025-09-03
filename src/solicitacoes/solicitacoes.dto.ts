import {  IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateSolicitacoeDto {
    @ApiProperty({
            description: 'ID do usuário alvo',
            example: '2'
        })
    @IsNumber()
    usuarioId_alvo: number;

    @ApiProperty({
            description: 'ID do usuário solicitante',
            example: '1'
        })
    @IsNumber()
    usuarioId_solicitante: number;

}

export class UpdateSolicitacoeDto extends PartialType(CreateSolicitacoeDto) {

}
