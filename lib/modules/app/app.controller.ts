import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { AdminEnvironment } from '../../admin-environment';

@Controller()
export class AppController {
  constructor(private env: AdminEnvironment) {}

  @Get('/')
  async helloWorld(@Req() request: Request) {
    return await this.env.render('index.njk', { request });
  }
}
