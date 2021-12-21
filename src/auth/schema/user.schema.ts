import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Offer } from '../../offers/schema/offer.schema';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
  @Prop()
  offers: [{ type: mongoose.Types.ObjectId, ref: 'Offer' }]
}

export const UserSchema = SchemaFactory.createForClass(User);
