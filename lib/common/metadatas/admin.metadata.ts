import { Type } from '@nestjs/common';

export interface AdminMetadata<T = unknown> {
  target: Function;
  entity: Type<T>;
  name: string;
  section: string;
}
