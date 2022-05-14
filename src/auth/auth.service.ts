import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './dao/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './dto/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.login(user);
    }
    // else {
    //   throw new UnauthorizedException('Please check your login credentials');
    // }
    return null;
  }

  async login(user: User) {
    // should settup interface
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
