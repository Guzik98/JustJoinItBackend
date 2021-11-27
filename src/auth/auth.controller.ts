import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';

@Controller('/auth')
export class AuthController {
  private logger = new Logger('TaskController');

  constructor( private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto ): Promise<User> {
      this.logger.verbose( `User ${authCredentialsDto.username} is trying to create a account`)
      return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto ): Promise<{ accessToken : string}> {
    this.logger.verbose( `User ${authCredentialsDto.username} is trying to log in`)
    return this.authService.signIn(authCredentialsDto);
  }

}


