import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./dto/auth-credenrials.dto";
import { Role } from "./role.enum";
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository : UsersRepository,
    private jwtService : JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return  this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{ role: Role; accessToken: string; username: string }>{
    let { username, password, role } = authCredentialsDto;
    const user = await  this.usersRepository.findOne({ username });

    if ( user && (await bcrypt.compare(password, user.password))){
      this.logger.verbose('uzytkownik zalogowany');
      const payload : JwtPayload = { username, role };
      console.log(payload)
      const accessToken : string = this.jwtService.sign(payload);
      // role = user.role
      return  { accessToken, role , username };
    } else {
      this.logger.verbose('uzytkownik nieznaleziony');
      throw new UnauthorizedException('Please check your login and password')
    }
  }
}
