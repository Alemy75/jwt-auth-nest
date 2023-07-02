import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

	// Авторизация
    async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}
	
	// Регистрация пользователя
    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUsersByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(
                'Пользователь с такой почтой уже зарегистрирован',
                400
            )
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        })
        return this.generateToken(user)

    }

	// Генерация JWT токена
    async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload),
        }
    }

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUsersByEmail(userDto.email)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({
			message: 'Некорректный email или пароль'
		})
	}
}
