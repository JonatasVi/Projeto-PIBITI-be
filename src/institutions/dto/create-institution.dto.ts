import { IsNumber, isString, IsString } from "class-validator";

export class CreateInstitutionDto {
    @IsNumber()
    id: number

    @IsString()
    nome: string

    @IsString()
    municipio: string

    @IsString()
    uf: string

    @IsString()
    sigla: string



}
