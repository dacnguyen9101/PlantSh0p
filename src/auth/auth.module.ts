import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './dao/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
    // JwtModule.register({
    //   secret:
    //     'JH9foSjWMz97qU1wrvRrjg=MTR(%t"dGre3U<a<}hu}f>zY"he.yA{3?-r<VMXc)V;Rha2\fta,x!^NWhGxW:',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
