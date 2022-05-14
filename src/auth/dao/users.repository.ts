import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../dto/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../dto/user-role.enum';
enum UserError {
  DUPLICATE_USERNAME = 23505,
}
const SALT_ROUND = 12

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor() {
    super();
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // hash
    const salt = await bcrypt.genSalt(SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      role: UserRole.CUSTOMER
    });
    try {
      await this.save(user);
    } catch (error) {
      // error.code is string number
      if (error.code == UserError.DUPLICATE_USERNAME) {
        throw new ConflictException(`Username ${username} already exists`);
      } else {       
        throw new InternalServerErrorException();
      }
    }
  }

}
