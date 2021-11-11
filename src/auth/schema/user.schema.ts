import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enum/role.enum';

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
