import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Salary {
  @Prop()
  from: number
  @Prop()
  to: number
  @Prop()
  currency: string
}

@Schema()
export class Skill {
  @Prop()
  name: string;
  @Prop()
  level: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

@Schema()
export class Employment_types {
  @Prop()
  type: string
  @Prop()
  salary: Salary
}

export const Employment_typesSchema = SchemaFactory.createForClass(Employment_types);

export type OfferDocument = Offer & Document

@Schema()
export class Offer {
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
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

