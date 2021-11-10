import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOffersDto, EmploymentTypeDto, SalaryTypeDto, SkillTypeDto } from "./dto/create-offers.dto";
import { Offer } from "./schema/offer.schema";

@Controller('/offers')
export class OffersController {
  private  logger = new Logger('OffersController');

  constructor(private  offersService: OffersService){}

  @Post()
    createPost(
      @Body() createOffersDto : CreateOffersDto,
      ) : Promise<Offer>{

      this.logger.verbose('nastąpiła próba stworzenia offerty')
      return this.offersService.createOffer(createOffersDto);
  }
  @Get()
  async findAll() : Promise<Offer[]> {
    return this.offersService.findAll();
  }


}
