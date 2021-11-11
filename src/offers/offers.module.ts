import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./schema/offer.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Offer.name, schema: OfferSchema}])],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
