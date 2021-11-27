import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from '../../auth/schema/user.schema';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

@Schema({_id: false})
export class Salary {
  @Prop()
  from: number
  @Prop()
  to: number
  @Prop()
  currency: string
}

@Schema({_id: false})
export class Skill {
  @Prop( )
  name: string;
  @Prop()
  level: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema({_id: false})
export class Employment_types {
  @Prop()
  type: string
  @Prop()
  salary: Salary
}

export const Employment_typesSchema = SchemaFactory.createForClass(Employment_types);

export type OfferDocument = Offer & Document

@Schema({ timestamps: true })
export class Offer {
  _id: mongoose.Schema.Types.ObjectId
  @Prop()
  title: string;
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  address_text: string;
  @Prop()
  marker_icon: string;
  @Prop()
  workplace_type: string;
  @Prop()
  company_name: string;
  @Prop()
  company_url: string;
  @Prop()
  company_size: string
  @Prop()
  experience_level: string;
  @Prop()
  latitude: string;
  @Prop()
  longitude: string;
  @Prop()
  published_at: string;
  @Prop()
  remote_interview: boolean;
  @Prop()
  id: string;
  @Prop({ type: [Employment_typesSchema], default: []})
  employment_types: Employment_types[]
  @Prop()
  company_logo_url: string
  @Prop({ type: [SkillSchema], default: []})
  skills: Skill[]
  user: ({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

