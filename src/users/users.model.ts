import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'mail@mail.ru', description: 'Почта' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @ApiProperty({ example: 'QWFkfqw12', description: 'Пароль' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @ApiProperty({ example: 'true', description: 'Забанен ли пользователь' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    banned: boolean

    @ApiProperty({
        example: 'Нарушение правила 1.2.3',
        description: 'Причина бана',
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
