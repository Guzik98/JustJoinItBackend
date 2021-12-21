import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthRepository {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async create(user: { password: any; role: Role; username: string }): Promise<User> {
    return await new this.userModel(user).save();
  }

  async findOneAndUpdate(filter: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(filter, update, { returnOriginal: false });
  }

  async findOne(username: string): Promise<User> {
      return this.userModel.findOne({username});
  }

}