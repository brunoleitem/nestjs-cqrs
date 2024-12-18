import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './shared/module/config/config-service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('port')
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(port)
}
bootstrap()
