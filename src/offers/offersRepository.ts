import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferDocument } from './schema/offer.schema';
import { AnyKeys, AnyObject, Model, ObjectId, Schema } from 'mongoose';
import { CreateOffersDto } from './dto/create-offers.dto';
import { User } from '../auth/schema/user.schema';
import { Logger } from '@nestjs/common';

export class OffersRepository {
  private logger = new Logger('OfferRepository');

  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>
  ) {
  }

  async findAll(): Promise<Offer[]> {
    return await this.offerModel.find().exec();
  }

  async createOffer(createOffersDto: CreateOffersDto, user: User): Promise<Offer> {
    this.logger.verbose(`New offer has been created ${createOffersDto}`);
    return new this.offerModel(createOffersDto, user).save();
  }

  async getUserOffers(filter: ObjectId): Promise<Offer[]>{
    // this.logger.verbose(`filter ${filter.type}`);
    return this.offerModel.find( { "_id": filter } ).exec();
  }

  async getOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<Offer>{
    return this.offerModel.findById( { "_id": _id }).exec();
  }

  async deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<Offer> {
    return this.offerModel.remove({ "_id": _id });
  }

}