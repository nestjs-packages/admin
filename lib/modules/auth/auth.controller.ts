import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { AdminEnvironment } from '../../admin-environment';

@Controller()
export class AuthController {
  constructor(private env: AdminEnvironment) {}

  @Get('/login')
  async renderLogin(@Req() request: Request) {
    return await this.env.render('login.njk', { request });
  }
}
