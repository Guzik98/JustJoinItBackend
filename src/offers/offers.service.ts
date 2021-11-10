import { Injectable } from '@nestjs/common';
import {
  CreateOffersDto,
  EmploymentTypeDto,

  SalaryTypeDto,
  SkillTypeDto
} from "./dto/create-offers.dto";
import { Offer, OfferDocument } from "./schema/offer.schema";
import { OffersRepository } from "./offers.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class OffersService {

  constructor(
    @InjectModel(Offer.name) private  offerModel : Model<OfferDocument>,
    private  offersRepository: OffersRepository
  ) {}

  async findAll() : Promise<Offer[]> {
    return  this.offerModel.find().exec();
  }

  async  createOffer (createOffersDto : CreateOffersDto, employmentTypeDto : EmploymentTypeDto, skillTypeDto : SkillTypeDto, salaryTypeDto : SalaryTypeDto) : Promise<Offer> {
    const {  title, street, city, address_text, marker_icon, workplace_type, company_name,
      company_url, company_size, experience_level, latitude, longitude, published_at, remote_interview,
      id, company_logo_url } = createOffersDto
     const { type } = employmentTypeDto
    const { name, level } = skillTypeDto
    const { from, to , currency } = salaryTypeDto


    return this.offersRepository.createOffers( {
      title,
      street,
      city,
      address_text,
      marker_icon,
      workplace_type,
      company_name,
      company_url,
      company_size,
      experience_level,
      latitude,
      longitude,
      published_at,
      remote_interview,
      id,
      company_logo_url,
      employment_types : [{
        type : type,
        salary : {
          to,
          from,
          currency,
        }
      }],
      skills : [
        {
        name,
        level,
      }]
    }
  )}
}