import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { AdminModuleOptions } from '../../../common';
import { ADMIN_MODULE_OPTIONS } from '../../../admin.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ADMIN_MODULE_OPTIONS) private readonly options: AdminModuleOptions,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as Request;

    const matched = req.headers.cookie.match(/token=(.+)/);

    if (!matched || matched.length < 2) {
      throw new UnauthorizedException('Credential not given');
    }
    const token = matched[1];
    if (!token) {
      throw new UnauthorizedException('Credential not given');
    }

    const user = jwt.verify(token, this.options.jwtSecretKey);
    (req as any).user = user;

    return true;
  }
}
