import { EntityRepository, Repository } from 'typeorm';
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credenrials.dto";
import  * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger( 'TasksRepository');

  async createUser(authCredentialsDto : AuthCredentialsDto ): Promise<void> {
    const { username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashed = await  bcrypt.hash(password, salt);

    const user = this.create({ username, password : hashed, role });

    try {
      this.logger.verbose(`uzytkownik został zapisany`)
      await this.save(user);
    } catch ( error ) {
      if(error.code === '23505') {
        this.logger.error( `uzytkownik o nazwie ${user.username} już istnieje`)
        throw new ConflictException('username already exists');
      } else {
        throw  new InternalServerErrorException();
      }
    }
  }
}