import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInPayload, SignInResponse } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'common/dto/response.dto';
import { DefResponse } from 'common/decorator/response.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ operationId: 'login' })
  @Post('login')
  @DefResponse(SignInResponse)
  async signIn(
    @Body() payload: SignInPayload,
  ): Promise<ResponseDto<SignInResponse>> {
    return this.service.signIn(payload.username, payload.password);
  }
}
