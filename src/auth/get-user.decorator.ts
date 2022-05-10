import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './dto/user.entity';

export const GetUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
