import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

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

  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    methods: configService.get('CORS_METHODS', 'GET,POST,PUT,DELETE,PATCH'),
    allowedHeaders: configService.get<string>(
      'CORS_ALLOWED_HEADERS',
      'Content-Type,Authorization',
    ),
  });

  // Add more limit on payload
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
