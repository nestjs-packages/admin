import { Module, UnauthorizedException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from '@nestjs-packages/admin';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AdminModule.register({
      path: '/example-admin',
      siteName: 'Example Admin',
      authenticate: async (id, password) => {
        if (id === 'test' && password === 'password') {
          return { name: 'admin' };
        }
        throw new UnauthorizedException();
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'root',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
