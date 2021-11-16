import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { User } from '../schema/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private AuthService: AuthService,
  ){
    super(
      {
        secretOrKey: 'topSecret51',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      }
    );
  }

  async validate(payload: JwtPayload) : Promise<User> {
    const { username } = payload;
    const user: User = await  this.AuthService.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user
  }
}