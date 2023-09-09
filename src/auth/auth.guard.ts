import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { verifyToken } from 'common/helper/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import E_MSG from 'common/constant/ErrorMsg';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    console.log(request.headers.authorization);

    const decoded = verifyToken(request.headers.authorization);

    const user = await this.userRepository.findOne({
      where: [{ username: decoded.username }, { id: decoded.id }],
    });

    if (!user) throw new UnauthorizedException(E_MSG.InvalidToken);

    console.log(user);

    return true;
  }
}
