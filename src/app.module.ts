import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { OffersModule } from './offers/offers.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    OffersModule,
    PhotosModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
