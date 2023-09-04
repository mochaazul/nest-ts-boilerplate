import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInPayload, SignInResponse } from './auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async signIn(@Body() payload: SignInPayload): Promise<SignInResponse> {
    return this.service.signIn(payload.username, payload.password);
  }
}
