import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from 'common/helper/hash';
import { UsersService } from 'src/users/users.service';
import { SignInResponse } from './auth.dto';
import E_MSG from 'common/constant/ErrorMsg';

@Injectable()
export class AuthService {
  constructor(
    private useService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<SignInResponse> {
    const user = await this.useService.findByUsername(username);
    const passwordMatch = compareHash(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException(E_MSG.WrongUsernamePassword);

    const payload = {
      username: user.username,
      id: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
