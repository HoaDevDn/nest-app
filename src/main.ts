import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from 'configs/env.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that are not part of DTO
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are found
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API NEST APP')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Users Tag') // Adding a tag to group routes under 'users'
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger at the `/api` route
  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT);
}
bootstrap();
