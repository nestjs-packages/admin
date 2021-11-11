import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { AdminModuleOptions } from '../../common';
import { ADMIN_MODULE_OPTIONS } from '../../admin.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(ADMIN_MODULE_OPTIONS) private readonly options: AdminModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.jwtSecretKey, { expiresIn: '3d' });
  }

  verify<T extends object = any>(token: string): T {
    return jwt.verify(token, this.options.jwtSecretKey) as T;
  }
}
