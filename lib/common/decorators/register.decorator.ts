import { Type } from '@nestjs/common';

import { MetadataStorage } from '../storages';

export function Register<T>(entity: Type<T>): ClassDecorator {
  return (target) => {
    MetadataStorage.addAdminMetadata({
      target,
      entity,
      name: target.name,
    });
  };
}
