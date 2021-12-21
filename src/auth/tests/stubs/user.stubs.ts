import { User } from '../../schema/user.schema';

export const userStub = (): User => {
  return {
    offers: [{ ref: 'Offer', type: undefined }],
    password: 'trolloddsdsd',
    role: 'EMPLOYER',
    username: 'tester543dsdd',
  }
}