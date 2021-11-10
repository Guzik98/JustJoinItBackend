import { IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '../role.enum';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, { message: 'Username need to have at least 4 characters'})
  @MaxLength(20, { message: 'Username is too long'})
  username: string

  @IsString()
  @MinLength(8, { message: 'Password need to have at least 8 characters'})
  @MaxLength(32, { message: 'Password is too long'})
  password: string

  role: Role
}