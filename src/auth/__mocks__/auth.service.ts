import { userStub } from '../tests/stubs/user.stubs';

export const AuthService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  signIn: jest.fn().mockResolvedValue(userStub()),
})