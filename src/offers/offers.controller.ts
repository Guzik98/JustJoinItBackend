import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer } from './schema/offer.schema';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('/offers')
export class OffersController {
  private logger = new Logger('OffersController');

  constructor(private offersService: OffersService){}

  @Post()
    createPost(
      @Body() createOffersDto: CreateOffersDto,
      @GetUser() user: User,
    ): Promise<Offer> {
      this.logger.verbose('User is trying to create new offer')
      return this.offersService.createOffer(createOffersDto, user);
    }

  @Get()
  async findAll(): Promise<Offer[]> {
    this.logger.verbose('User is trying to get all offers')
    return this.offersService.findAll();
  }
}
