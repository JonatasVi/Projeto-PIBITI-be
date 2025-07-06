import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitutionDto } from './instituicoes.dto';

export class UpdateInstitutionDto extends PartialType(CreateInstitutionDto) {}
