import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

// Создание сервера
async function start() {
    const PORT = process.env.PORT || 5000

    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Пользователи')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () =>
        console.log(`Server is running on port: ${PORT}`)
    )
}

start()
