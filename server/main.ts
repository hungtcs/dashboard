import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  SwaggerModule.setup(
    '/api/swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Icon Repository')
        .setDescription('easystack icon repository service')
        .setVersion('0.0.1')
        .addBearerAuth()
        .addServer('/api', 'default')
        .build(),
    ),
  );

  app.useGlobalPipes(
    new ValidationPipe(
      {
        transform: true,
        whitelist: true,
        exceptionFactory: errors => new BadRequestException(errors),
        validationError: {
          value: false,
          target: false,
        },
        skipNullProperties: false,
      },
    ),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
