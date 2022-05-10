import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@UsePipes(ValidationPipe)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.validateUser(username, password);
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('test')
  // test(@GetUser() user: User) {
  //   return user
  // }
}
