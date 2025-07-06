import { PartialType } from '@nestjs/swagger';
import { CreatePermutacoeDto } from './permutacoes.dto';

export class UpdatePermutacoeDto extends PartialType(CreatePermutacoeDto) {}
