import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import E_MSG from 'common/constant/ErrorMsg';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const [req] = context.getArgs();
    const userPermissions: string[] = req?.user?.permissions || [];
    const requiredPermissions: string[] =
      this.reflector.get('permissions', context.getHandler()) || [];
    const hasAllPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (requiredPermissions.length === 0 || hasAllPermissions) return true;

    throw new ForbiddenException(E_MSG.NotEnoughPermission);
    // return true;
  }
}
