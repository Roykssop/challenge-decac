import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { initSwaggerSetup } from './contexts/catalog/shared/infrastructure/docs/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  initSwaggerSetup(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
