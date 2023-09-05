import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAG_TITLE ?? '')
    .setDescription(process.env.SWAG_DESC ?? '')
    .setVersion(process.env.SWAG_DOCS_VERSION ?? '')
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, swaggerOptions);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
