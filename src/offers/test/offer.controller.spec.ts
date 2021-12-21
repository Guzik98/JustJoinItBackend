import { OffersService } from "../offers.service";
import { OffersController } from '../offers.controller';
import { Test } from '@nestjs/testing';
import { CreateOffersDto } from "../dto/create-offers.dto";
import { offerStub } from './stubs/offer.stubs';
import { Offer } from '../schema/offer.schema';
import { User } from '../../auth/schema/user.schema';
import { userStub } from '../../auth/tests/stubs/user.stubs';
import { PassportModule } from '@nestjs/passport';
import { ObjectId, Schema } from 'mongoose';
import * as mongoose from 'mongoose';

jest.mock('../offers.service');

describe('OffersController', () => {
  let offerController: OffersController;
  let offersService: OffersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [OffersController],
      providers: [OffersService]
    }).compile();

    offerController = moduleRef.get<OffersController>(OffersController)
    offersService = moduleRef.get<OffersService>(OffersService);
    jest.clearAllMocks();
  })


  describe('createOffer', () => {
    describe('when createOffer is called', () => {
      let createOffersDto: CreateOffersDto
      let offer: Offer
      let user: User

      beforeEach(async () => {
        user = {
          offers: [{ ref: 'Offer', type: undefined }],
          password: userStub().password,
          role: userStub().role,
          username: userStub().username
        }

        createOffersDto = {
          address_text: offerStub().address_text,
          city: offerStub().city,
          company_logo_url: offerStub().company_logo_url,
          company_name: offerStub().company_name,
          company_size: offerStub().company_size,
          company_url: offerStub().company_url,
          country_code: offerStub().country_code,
          employment_types: offerStub().employment_types,
          experience_level: offerStub().experience_level,
          id: offerStub().id,
          latitude: offerStub().latitude,
          longitude: offerStub().longitude,
          marker_icon: offerStub().marker_icon,
          published_at: offerStub().published_at,
          remote_interview: offerStub().remote_interview,
          skills: offerStub().skills,
          street: offerStub().street,
          title: offerStub().title,
          workplace_type: offerStub().workplace_type,
        }
        offer = await  offerController.createOffer(createOffersDto, user);
      })

      test('then it should call OffersService', () => {
        expect(offersService.createOffer).toHaveBeenCalledWith(createOffersDto, user)
      })

      test('then it should return offer', () => {
        expect(offer).toEqual(offerStub());
      })
    })
  })

  describe('getAllOffers', () => {
    describe('when getAllOffers is called', () => {
      let offers: Offer[];

      beforeEach(async () => {
        offers = await  offerController.getAllOffers();
      })

      test('then it should call offerService', () => {
        expect(offersService.getAllOffers).toHaveBeenCalledWith();
      })

      test('then it should return offers', () => {
        expect(offers).toEqual([offerStub()]);
      })
    })
  })

  describe('getUserOffers', () => {
    describe('when getUserOffers is called', () => {
      let offers: Offer[];
      let user: User;

      beforeEach(async () => {
        offers = await offerController.getUserOffers(user)
      })

      test('then it should call offerService', () => {
        expect(offersService.getUserOffers).toHaveBeenCalledWith(user)
      })

      test('then it should return user offers', () => {
        expect(offers).toEqual([offerStub()]);
      })
    })
  })

  describe('getOfferById', () => {
    describe('when getOfferById is called', () => {
      let offer: Offer;
      let _id: { type: Schema.Types.ObjectId; ref: 'Offer' };

      beforeEach(async () => {
        offer = await  offerController.getOfferById(_id);
      })

      test('then it should call offerService', () => {
        expect(offersService.getOfferById).toHaveBeenCalledWith(_id);
      })

      test('then it should return user offers', () => {
        expect(offer).toEqual(offerStub());
      })
    })
  })

  describe('updateOfferById', () => {
    describe('when updateOfferById is called', () => {
      const mockObjectId = new mongoose.Types.ObjectId()
      let user: User;
      let _id;
      let offer: Offer
      let createOffersDto: CreateOffersDto

      beforeEach(async () => {
        _id = mockObjectId
        user = {
          offers: [{ ref: 'Offer', type: undefined }],
          password: userStub().password,
          role: userStub().role,
          username: userStub().username
        }

        createOffersDto = {
          address_text: offerStub().address_text,
          city: offerStub().city,
          company_logo_url: offerStub().company_logo_url,
          company_name: offerStub().company_name,
          company_size: offerStub().company_size,
          company_url: offerStub().company_url,
          country_code: offerStub().country_code,
          employment_types: offerStub().employment_types,
          experience_level: offerStub().experience_level,
          id: offerStub().id,
          latitude: offerStub().latitude,
          longitude: offerStub().longitude,
          marker_icon: offerStub().marker_icon,
          published_at: offerStub().published_at,
          remote_interview: offerStub().remote_interview,
          skills: offerStub().skills,
          street: offerStub().street,
          title: offerStub().title,
          workplace_type: offerStub().workplace_type,
        }

        offer = await offerController.updateOfferById(user, _id, createOffersDto)
      })

      test('then it should call offerService', () => {
        expect(offersService.updateOfferById).toHaveBeenCalledWith( _id, createOffersDto, user.username);
      })

      test('then it should return  offer', () => {
        expect(offer).toEqual(offerStub());
      })
    })
  })
})