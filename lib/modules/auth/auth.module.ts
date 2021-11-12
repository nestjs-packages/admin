import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { JwtAuthGuard } from './guards';
import { UnauthorizedExceptionFilter } from './filters';

import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
  ],
})
export class AuthModule {}
