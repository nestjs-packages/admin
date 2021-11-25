import { Register } from '@nestjs-packages/admin';

import { UserEntity } from './user.entity';

@Register(UserEntity)
export class UserAdmin {}
