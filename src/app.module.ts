import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { OffersModule } from './offers/offers.module';
import { MONGO_CONNECTION } from './app.properties';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    AuthModule,
    OffersModule,
    PhotosModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
