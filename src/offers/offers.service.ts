import { Injectable } from '@nestjs/common';
import { CreateOffersDto } from "./dto/create-offers.dto";
import { Offer, OfferDocument } from "./schema/offer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {}

  async findAll(): Promise<Offer[]> {
    return  this.offerModel.find().exec();
  }

  async  createOffer(createOffersDto: CreateOffersDto): Promise<Offer> {
    const createdOffer = new this.offerModel(createOffersDto);
    return createdOffer.save();
  }
}