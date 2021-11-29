import { Injectable, Logger } from '@nestjs/common';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer } from './schema/offer.schema';
import { ObjectId, Schema } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { OffersRepository } from './offersRepository';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { AuthRepository } from '../auth/auth.repository';
import * as mongoose from 'mongoose';

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

  async findUserAndUpdate(offer: Offer, user: User, todo: string): Promise<void> {
    const filter = { username: user.username };
    let update

    if(todo === 'add')
      update = {
        offers: [...user.offers, offer._id]
      }

    if (todo === 'delete')
      update = { "$pull" : { "offers" :  offer._id } }

    await this.authRepository.findOneAndUpdate(filter, update);
  }

  async createOffer(createOffersDto: CreateOffersDto, user: User) : Promise<Offer> {
    this.logger.verbose(`user created new Offer ${user}`);
    createOffersDto.username = user.username;
    const createdOffer =  this.offerRepository.createOffer(createOffersDto);
    await this.findUserAndUpdate(await createdOffer, user, 'add');
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

  async deleteOfferById(_id: { type: Schema.Types.ObjectId; ref: 'Offer' }, user: User): Promise<void>{
    const offer = await this.offerRepository.getOfferById(_id)
    await  this.findUserAndUpdate(offer, user, 'delete')
    await this.offerRepository.deleteOfferById(_id, user.username);
  }

  async updateOfferById(
    _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
    updateOfferDto: UpdateOfferDto, username: string) : Promise<Offer>{
    const update = {
      workplace_type: updateOfferDto.workplace_type,
      remote_interview: updateOfferDto.remote_interview,
      skills: updateOfferDto.skills,
      employment_types: updateOfferDto.employment_types
    }
    return this.offerRepository.updateOfferById(_id, username, update)
  }

}