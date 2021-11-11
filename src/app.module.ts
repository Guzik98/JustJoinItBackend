import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_CONNECTION } from './app.properties';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    AuthModule,
    OffersModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'joinIt',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OffersModule,
  ],
})
export class AppModule {}
