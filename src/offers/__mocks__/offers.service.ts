import { offerStub } from '../test/stubs/offer.stubs';

export const OffersService = jest.fn().mockReturnValue({

  createOffer: jest.fn().mockResolvedValue(offerStub()),
  getAllOffers: jest.fn().mockResolvedValue([offerStub()]),
  getUserOffers: jest.fn().mockResolvedValue([offerStub()]),
  getOfferById: jest.fn().mockResolvedValue(offerStub()),
  updateOfferById: jest.fn().mockResolvedValue(offerStub()),

})