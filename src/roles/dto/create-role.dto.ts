import { ApiProperty } from '@nestjs/swagger'


export class CreateRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Наименование'})
    readonly value: string
    
    @ApiProperty({example: 'Администратор', description: 'Описание'})
    readonly description: string
}