import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { GeneralTypeModule } from './general-type/general-type.module';
import { ServicesService } from './services/services.service';
import { ServicesModule } from './services/services.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PublicationModule } from './publication/publication.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ClientModule,
    GeneralTypeModule,
    ServicesModule,
    PublicationModule,
    GalleryModule,
  ],
  providers: [ServicesService],
})
export class AppModule {}
