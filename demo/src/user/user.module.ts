import { Module } from '@nestjs/common';

import { UserAdmin } from './user.admin';

@Module({
  providers: [UserAdmin],
})
export class UserModule {}
