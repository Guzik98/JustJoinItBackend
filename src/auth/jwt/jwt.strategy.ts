import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from '../schema/user.schema';
import { AuthRepository } from '../auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authRepository: AuthRepository,
  ){
    super(
      {
        secretOrKey: process.env.SECRETORKEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      }
    );
  }

  async validate(payload: JwtPayload) : Promise<User> {
    const { username } = payload;
    const user: User = await this.authRepository.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user
  }
}