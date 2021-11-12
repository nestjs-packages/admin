import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AdminModuleOptions } from '../../common';
import { AdminEnvironment } from '../../admin-environment';
import { ADMIN_MODULE_OPTIONS } from '../../admin.constants';

import { LoginDto } from './dtos';
import { JwtService } from './jwt.service';

@Controller()
export class AuthController {
  constructor(
    @Inject(ADMIN_MODULE_OPTIONS) private readonly options: AdminModuleOptions,
    private readonly env: AdminEnvironment,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/login')
  async renderLogin(@Req() request: Request, @Res({ passthrough: true }) res) {
    if (!this.options.authenticate) {
      return res.redirect(this.options.path);
    }

    return await this.env.render('login.njk', { request });
  }

  @Post('/login')
  async login(@Body() { id, password }: LoginDto, @Res() res: Response) {
    if (!this.options.authenticate) {
      return res.redirect(this.options.path);
    }

    try {
      const result = await this.options.authenticate(id, password);
      if (!result) {
        throw new UnauthorizedException();
      }

      const token = await this.jwtService.sign({ id, ...result });
      res.cookie('token', token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      res.redirect(this.options.path);
    } catch (err) {
      console.log(err);
      res.redirect(this.options.path + '/login');
    }
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    if (!this.options.authenticate) {
      return res.redirect(this.options.path);
    }

    res.redirect(this.options.path + '/login');
  }
}
