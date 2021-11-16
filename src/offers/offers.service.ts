import { Injectable, Logger } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer, OfferDocument } from './schema/offer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/user.schema';

@Injectable()

export class OffersService {
  constructor(@InjectModel(Offer.name) private offerModel: Model<OfferDocument>) {}

  private logger = new Logger('OffersService');

  async findAll(): Promise<Offer[]> {
    this.logger.verbose('user got all offers');
    return  this.offerModel.find().exec();
  }

  async createOffer(createOffersDto: CreateOffersDto, user: User ): Promise<Offer> {
    const createdOffer = new this.offerModel(createOffersDto, user);

    this.logger.verbose('user created new Offer');

    return createdOffer.save();
  }
}