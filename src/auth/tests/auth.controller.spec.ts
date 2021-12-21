import { User } from '../schema/user.schema';
import { AuthController } from '../auth.controller';
import { Test } from '@nestjs/testing';
import { userStub } from './stubs/user.stubs';
import { AuthCredentialsDto } from '../dto/auth-credenrials.dto';
import { Role } from '../enum/role.enum';
import { AuthService } from '../auth.service';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';

jest.mock('../auth.service');

describe('AuthController', () => {
  let usersController: AuthController;
  let usersService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    usersController = moduleRef.get<AuthController>(AuthController);
    usersService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  })

  describe('signIn', () => {
    describe('when signIn is called', () => {
      let accessToken: { accessToken: string }
      let loginCredentialsDto: LoginCredentialsDto;

      beforeEach(async () => {
        loginCredentialsDto = {
          username: userStub().username,
          password: userStub().password,
        }
        accessToken = await usersController.signIn(loginCredentialsDto)
      })

      test('then it should call authService', () => {
        expect(usersService.signIn)
          .toBeCalledWith(loginCredentialsDto);
      })

      test('then is should return a accessToken', () => {
        expect(accessToken).toEqual(userStub());
      })
    })
  })

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: AuthCredentialsDto

      console.log(userStub());
      beforeEach(async () => {
        createUserDto = {
          role: userStub().role as Role,
          password: userStub().password,
          username: userStub().username,
        }
        user = await usersController.create(createUserDto);
      })

      test('then it should call AuthService', () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      })

      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })

})