import { Injectable, Logger } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer } from './schema/offer.schema';
import { ObjectId, Schema } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { OffersRepository } from './offersRepository';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthRepository } from '../auth/auth.repository';

@Injectable()
export class OffersService {
  private logger = new Logger('OffersService');

  constructor(
    private authRepository: AuthRepository,
    private offerRepository: OffersRepository
  ) {}

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.findAll();
  }

  async findUserAndUpdate(offer: Offer, user: User, todo: string): Promise<void> {
    const filter = { username: user.username };
    let update;
    if(todo === 'add'){
      update = { offers: [...user.offers, offer._id] };
    }

    if (todo === 'delete'){
      update = { "$pull" : { "offers" :  offer._id } };
    }

    await this.authRepository.findOneAndUpdate(filter, update);
  }

  async createOffer(createOffersDto: CreateOffersDto, user: User) : Promise<Offer> {
    const createdOffer =  this.offerRepository.createOffer(createOffersDto);
    this.logger.verbose(`user created new Offer ${user.username}`);

    await this.findUserAndUpdate(await createdOffer, user, 'add');
    this.logger.verbose(`user account updated`);

    return createdOffer;
  }

  async getUserOffers(user: User): Promise<Offer[]> {
    return this.offerRepository.getUserOffers(user.offers as unknown as ObjectId);
  }

  async getOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }): Promise<Offer>{
    return this.offerRepository.getOfferById(_id);
  }

  async deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }, user: User): Promise<void>{
    const offer = await this.offerRepository.getOfferById(_id);
    this.logger.verbose('user got his offer');

    await  this.findUserAndUpdate(offer, user, 'delete')
    this.logger.verbose('user profile is updated');

    await this.offerRepository.deleteOfferById(_id, user.username);
    this.logger.verbose('offer is deleted');
  }

  async updateOfferById(
    _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
    updateOfferDto: UpdateOfferDto, username: string) : Promise<Offer>{
    return this.offerRepository.updateOfferById(_id, username, updateOfferDto)
  }
}