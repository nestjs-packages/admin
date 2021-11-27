import { Type } from '@nestjs/common';

import { MetadataStorage } from '../storages';

export interface AdminOptions {
  /**
   * Path of the Admin
   */
  path?: string;
  /**
   * Section name of the Admin
   */
  section?: string;
}

export function Register<T>(
  entity: Type<T>,
  options?: AdminOptions,
): ClassDecorator {
  return (target) => {
    MetadataStorage.addAdminMetadata({
      target,
      entity,
      name: target.name,
      path: options?.path ?? entity.name.toLowerCase(),
      section: options?.section ?? '-',
    });
  };
}
