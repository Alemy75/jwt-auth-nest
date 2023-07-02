import { ApiProperty } from '@nestjs/swagger'


export class CreateUserDto {
    @ApiProperty({example: 'mail@mail.ru', description: 'Почта'})
    readonly email: string

    @ApiProperty({example: 'QWFkfqw12', description: 'Пароль'})
    readonly password: string
}


