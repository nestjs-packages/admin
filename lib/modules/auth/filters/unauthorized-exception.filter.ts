import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';

import { AdminModuleOptions } from '../../../common';
import { ADMIN_MODULE_OPTIONS } from '../../../admin.constants';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(ADMIN_MODULE_OPTIONS) private readonly options: AdminModuleOptions,
  ) {}

  catch(_exception: UnauthorizedException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    res.redirect(this.options.path + '/login');
  }
}
