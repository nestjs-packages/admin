import { Register } from '@nestjs-packages/admin';

import { UserEntity } from './user.entity';

@Register(UserEntity, { section: '회원 관리' })
export class UserAdmin {}
