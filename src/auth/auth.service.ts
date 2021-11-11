import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./dto/auth-credenrials.dto";
import { Role } from "./role.enum";
import { JwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService : JwtService,
  ) {}


  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    const { username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt, role);

    const createUser = new this.userModel({ username, password : hashed, role})

    try {
      await createUser.save();
      this.logger.verbose(`Account was created`)
    } catch ( error ) {
      if(error.code === '23505') {
        this.logger.error( `That username is already taken`)
        throw new ConflictException('username already exists');
      } else {
        throw  new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ role: Role; accessToken: string; username: string }>{
    const { username, password } = authCredentialsDto;
    const user = await  this.userModel.findOne({ username });
    //username we got from login page role we get from founded user
    const role = user.role

    if ( user && (await bcrypt.compare(password, user.password))){
      const payload : JwtPayload = { username, role };
      const accessToken : string = this.jwtService.sign(payload);

      this.logger.verbose('user is logged');
      return  { accessToken, role , username };
    } else {

      this.logger.verbose('user was not found');
      throw new UnauthorizedException('Please check your login and password')
    }
  }
}
