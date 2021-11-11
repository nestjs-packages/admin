import { Module } from '@nestjs/common';

import { AdminModule } from '@nestjs-packages/admin';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AdminModule.register({
      path: '/ceos',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
