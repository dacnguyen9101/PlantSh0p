import { ExecutionContext } from '@nestjs/common';
import { User } from 'src/auth/dto/user.entity';

export function takeUser(context: ExecutionContext): User {
  const req = context.switchToHttp().getRequest();
  return req.user; // non-password
}
