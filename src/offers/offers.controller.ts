import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOffersDto } from './dto/create-offers.dto';
import { Offer } from './schema/offer.schema';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { Schema } from 'mongoose';
import { UpdateOfferDto } from './dto/update-offer.dto';

@UseGuards(AuthGuard())
@Controller('/offers')
export class OffersController {
  private logger = new Logger('OffersController');

  constructor(private offersService: OffersService){}

  @Post()
  @UsePipes(ValidationPipe)
  createOffer(
    @Body() createOffersDto: CreateOffersDto,
    @GetUser() user: User,
  ): Promise<Offer>{
    this.logger.verbose(`User ${user.username} is creating new task.`)
    return this.offersService.createOffer(createOffersDto, user);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    this.logger.verbose('User is trying to get all offers')
    return this.offersService.findAll();
  }

  @Get(`/your-offers`)
  getUserOffers(
    @GetUser() user: User
  ): Promise<Offer[]> {
    this.logger.verbose(`User ${user} is trying to get offers`)
    return this.offersService.getUserOffers(user);
  }

  @Get('/your-offers/:_id')
  getOfferById(
    @Param('_id') _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
  ): Promise<Offer> {
    return  this.offersService.getOfferById(_id)
  }

  @Delete('/your-offers/:_id')
  deleteOfferById(
    @GetUser() user: User,
    @Param('_id') _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
  ): Promise<void>{
    return  this.offersService.deleteOfferById(_id, user)
  }

  @Post('/your-offers/:_id')
  updateOfferById(
    @GetUser() user: User,
    @Param('_id') _id: { type: Schema.Types.ObjectId; ref: 'Offer' },
    @Body() updateOfferDto: UpdateOfferDto
  ): Promise<Offer>{
    return this.offersService.updateOfferById(_id, updateOfferDto, user.username)
  }
}
