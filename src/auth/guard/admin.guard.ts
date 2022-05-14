import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { takeUser } from 'src/utils/take-user';
import { UserRole } from '../dto/user-role.enum';
import { User } from '../dto/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user: User = takeUser(context);
    console.log(user);
    
    if (user && user.role === UserRole.ADMIN) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
