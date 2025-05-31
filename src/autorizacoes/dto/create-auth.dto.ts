import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"


export class LoginDto {
    @ApiProperty({
        description: 'email do usuario',
        example: 'usuario@gmail.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'senha dos usuario',
        example: 'senha1234'
    })
    @IsString()
    @MinLength(8)
    senha: string
}
