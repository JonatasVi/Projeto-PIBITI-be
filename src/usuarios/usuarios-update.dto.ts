import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './usuarios.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    

}
