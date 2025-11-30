import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwaggerSetup(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Api Challenge')
    .setDescription('Challenge DeCaC')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
