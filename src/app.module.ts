import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { OffersModule } from './offers/offers.module';
import { MONGO_CONNECTION } from './app.properties';

@Module({
  imports: [
    AuthModule,
    OffersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
  ],
})
export class AppModule {}
