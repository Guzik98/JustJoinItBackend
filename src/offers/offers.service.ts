import { Injectable, Logger } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer } from './schema/offer.schema';
import { ObjectId, Schema } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { AuthRepository } from 'src/auth/auth.repository';
import { OffersRepository } from './offersRepository';

@Injectable()
export class OffersService {
  private logger = new Logger('OffersService');

  constructor(
    private authRepository: AuthRepository,
    private offerRepository: OffersRepository
  ) {}

  async findAll(): Promise<Offer[]> {
    this.logger.verbose('user got all offers');
    return this.offerRepository.findAll();
  }

  async findUserAndUpdate(offer: Offer, user: User): Promise<void> {
    const filter = { username: user.username };
    const update = { offers: [...user.offers, offer._id] };
    await this.authRepository.findOneAndUpdate(filter, update);
  }

  async createOffer(createOffersDto: CreateOffersDto, user: User) : Promise<Offer> {
    this.logger.verbose(`user created new Offer ${user}`);
    const createdOffer =  this.offerRepository.createOffer(createOffersDto, user)
    await this.findUserAndUpdate(await createdOffer, user);
    return createdOffer
  }

  async getUserOffers(user: User): Promise<Offer[]> {
    const filter =[]
    user.offers.map(item => {
      this.logger.verbose(`${item}`)
      return filter.push(item);
    })

    this.logger.verbose(`filter ${filter}`)
    return this.offerRepository.getUserOffers(filter as unknown as ObjectId)
  }

  async getOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<Offer>{
    return this.offerRepository.getOfferById(_id)
  }

  async  deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<void>{
     await this.offerRepository.deleteOfferById(_id);
  }

}