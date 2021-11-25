import { Type } from '@nestjs/common';

import { MetadataStorage } from '../storages';

export interface AdminOptions {
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
      section: options?.section ?? '-',
    });
  };
}
