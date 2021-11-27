import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enum/role.enum';
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
  role: Role;
  @Prop()
  offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }]
}

export const UserSchema = SchemaFactory.createForClass(User);
