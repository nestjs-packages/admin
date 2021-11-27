import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AdminEnvironment } from '../../admin-environment';
import { getAdminSections } from '../../common/helpers';

import { JwtAuthGuard } from '../auth';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private env: AdminEnvironment) {}

  @Get('/')
  async helloWorld(@Req() request: Request) {
    const sections = getAdminSections();

    return await this.env.render('index.njk', { sections, request });
  }
}
