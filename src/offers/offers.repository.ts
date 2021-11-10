import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Offer, OfferDocument } from "./schema/offer.schema";
import { Model } from "mongoose";

@Injectable()
export class OffersRepository {
  constructor(@InjectModel(Offer.name) private  offerModel : Model<OfferDocument>) {}

  private logger = new Logger();

  async createOffers(offer: {
    company_logo_url: string;
    workplace_type: string;
    city: string;
    latitude: string;
    marker_icon: string;
    title: string;
    remote_interview: boolean;
    street: string;
    company_name: string;
    address_text: string;
    company_url: string;
    id: string;
    published_at: string;
    experience_level: string;
    company_size: string;
    longitude: string
    employment_types:[{
      type: string;
      salary : {
        from: number;
        to: number;
        currency: string;
      }
    }]
    skills : [
        {
          name: string;
          level: number;
        },
      ]
  })
    : Promise<Offer> {


    const newOffer = new this.offerModel(offer);
    this.logger.verbose('oferta zapisana')
    return  newOffer.save()
  }
}