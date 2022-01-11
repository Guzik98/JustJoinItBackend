import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./dto/auth-credenrials.dto";
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from './schema/user.schema';
import { AuthRepository } from './auth.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  async create(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const { username, password, role } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt );
    const createUser = ({ username: username, password : hashed, role: role})
    return await this.authRepository.findOne(username)
      .then((response) => {
        if( response == null){
          return this.authRepository.create(createUser)
        } else {
          this.logger.error( `That username is already taken`)
          throw new ConflictException('username already exists');
        }
      })
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.authRepository.findOne( username )
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }>{
    const  { username, password } = loginCredentialsDto;

    const user = await this.getUserByUsername(username);
    if ( user && (await bcrypt.compare(password, user.password))){
      const role = user.role
      const payload: JwtPayload = { username, role  };
      const accessToken: string = this.jwtService.sign(payload);

      this.logger.verbose(`${username} is logged`);
      return  { accessToken };

    } else {
      this.logger.verbose('user was not found');
      throw new UnauthorizedException('Please check your login and password')
    }
  }
}
