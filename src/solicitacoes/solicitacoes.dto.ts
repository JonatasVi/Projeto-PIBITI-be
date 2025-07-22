import { IsEnum, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

enum status { Pendente, Aceita, Rejeitada }

export class CreateSolicitacoeDto {

    @IsNumber()
    usuarioId_alvo: number;

    @IsNumber()
    usuarioId_solicitante: number;

}

export class UpdateSolicitacoeDto extends PartialType(CreateSolicitacoeDto) {

}
