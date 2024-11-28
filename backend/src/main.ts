import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Chancay360 API')
    .setDescription('The Chancay360 API description')
    .setVersion('1.0')
    .addTag('chancay360')
    .build();

  const documentaryFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentaryFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
