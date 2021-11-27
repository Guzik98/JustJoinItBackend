import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from "./schema/offer.schema";
import { AuthModule } from '../auth/auth.module';
import { OffersRepository } from './offersRepository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    AuthModule,
  ],

  controllers: [OffersController],
  providers: [OffersService, OffersRepository]
})
export class OffersModule {}
