import { PartialType } from '@nestjs/swagger';
import { CreatePermutacoeDto } from './create-permutacoe.dto';

export class UpdatePermutacoeDto extends PartialType(CreatePermutacoeDto) {}
