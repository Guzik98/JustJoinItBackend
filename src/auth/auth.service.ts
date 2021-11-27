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
import { Role } from "./enum/role.enum";
import { JwtPayload } from './jwt/jwt-payload.interface';
import { User } from './schema/user.schema';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService  {
  private logger = new Logger('AuthService');
  constructor(
    private jwtService : JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
    const { username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt );
    const createUser = ({ username, password : hashed, role})

    try {
      return this.authRepository.create(createUser)
    } catch ( error ) {
      if(error.code === '23505') {
        this.logger.error( `That username is already taken`)
        throw new ConflictException('username already exists');
      } else {
        throw  new InternalServerErrorException();
      }
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.authRepository.findOne( username )
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ role: Role; accessToken: string; username: string }>{
    const  { username, password } = authCredentialsDto;

    const user = await this.getUserByUsername(username);
    const role = user.role
    if ( user && (await bcrypt.compare(password, user.password))){

      const payload: JwtPayload = { username, role };
      const accessToken: string = this.jwtService.sign(payload);

      this.logger.verbose('user is logged');
      return  { accessToken, role, username };

    } else {
      this.logger.verbose('user was not found');
      throw new UnauthorizedException('Please check your login and password')
    }
  }


}
