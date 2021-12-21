import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credenrials.dto';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('/auth')
export class AuthController {
  private logger = new Logger('TaskController');

  constructor( private authService: AuthService) {}

  @Post('/signup')
  create(@Body() authCredentialsDto: AuthCredentialsDto ): Promise<User> {
      this.logger.verbose( `User ${authCredentialsDto.username} is trying to create a account`)
      return this.authService.create(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() loginCredentialsDto: LoginCredentialsDto ): Promise<{ accessToken: string }> {
    this.logger.verbose( `User ${loginCredentialsDto.username} is trying to log in`)
    return this.authService.signIn(loginCredentialsDto);
  }

}


