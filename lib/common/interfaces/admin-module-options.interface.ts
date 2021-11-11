import { ModuleMetadata, Type } from '@nestjs/common';

export interface AdminModuleOptions {
  /** @default '/admin'  */
  path?: string;
  /** @default 'Nest.js admin' */
  siteName?: string;

  authenticate?: (
    id: string,
    password: string,
  ) => Promise<void | { name?: string }>;
}

type AdminModuleOptionsWithoutPath = Omit<AdminModuleOptions, 'path'>;

export interface AdminOptionsFactory {
  createAdminOptions():
    | Promise<AdminModuleOptionsWithoutPath>
    | AdminModuleOptionsWithoutPath;
}

export interface AdminModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'>,
    Pick<AdminModuleOptions, 'path'> {
  useExisting?: Type<AdminOptionsFactory>;
  useClass?: Type<AdminOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AdminModuleOptionsWithoutPath> | AdminModuleOptionsWithoutPath;
  inject?: any[];
}
