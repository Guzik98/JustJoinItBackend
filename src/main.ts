import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { doc } from 'prettier';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = 3000
  await app.listen(port);
  logger.log(`Apllication listening on port ${port}`);
}
bootstrap();
