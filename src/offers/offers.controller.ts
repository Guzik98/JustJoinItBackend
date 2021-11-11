import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOffersDto } from "./dto/create-offers.dto";
import { Offer } from "./schema/offer.schema";

@Controller('/offers')
export class OffersController {
  private logger = new Logger('OffersController');

  constructor(private offersService: OffersService){}

  @Post()
    createPost(@Body() createOffersDto: CreateOffersDto): Promise<Offer>{
      this.logger.verbose('User is trying to create new offer')
      return this.offersService.createOffer(createOffersDto);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    this.logger.verbose('User is trying to get all offers')
    return this.offersService.findAll();
  }
}
