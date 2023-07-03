import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsEmail } from 'class-validator'



export class CreateUserDto {
    @ApiProperty({example: 'mail@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: "Неккоректный email"})
    readonly email: string

    @ApiProperty({example: 'QWFkfqw12', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: "Не менее 4 и не более 16 символов"})
    readonly password: string
}


