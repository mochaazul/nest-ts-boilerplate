import { UnauthorizedException } from '@nestjs/common';
import E_MSG from 'common/constant/ErrorMsg';
import jwtConstant from 'common/constant/jwtConstant';
import jwt, { verify, JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
export const verifyToken = (headerAuth?: string) => {
  try {
    if (!headerAuth) throw new UnauthorizedException(E_MSG.NoToken);
    const token = headerAuth.split(' ')[1];
    const decoded = verify(token, jwtConstant);

    return decoded as JwtPayload;
  } catch (error: any) {
    const jwtErr = error as JsonWebTokenError;
    throw new UnauthorizedException(jwtErr.message);
  }
};
