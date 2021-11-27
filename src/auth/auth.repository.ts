import { Injectable, Logger } from '@nestjs/common';
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthRepository {
  private logger = new Logger('AuthRepository');

  constructor(
    @InjectModel(User.name)
    public userModel: Model<UserDocument>
  ) {
  }

  async create(user: { password: any; role: Role; username: string }): Promise<User> {
    this.logger.verbose(`Account was created`);
    return await new this.userModel(user).save();
  }

  async findOneAndUpdate(filter: FilterQuery<UserDocument>, update): Promise<UserDocument> {
    this.logger.verbose(`User was updated`)
    return this.userModel.findOneAndUpdate(filter, update, { returnOriginal: false });
  }

  async findOne(username: string): Promise<User> {
    this.logger.verbose(`${username} is founded`);
    return this.userModel.findOne({username});
  }


}