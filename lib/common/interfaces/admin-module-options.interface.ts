import { ModuleMetadata, Type } from '@nestjs/common';

export interface AdminModuleOptions {
  /** @default '/admin'  */
  path?: string;
  /** @default 'Nest.js admin' */
  siteName?: string;

  /** pass if returned value is truthy. When NOT provided, it will initialize AdminJS without login page and authorization function. */
  authenticate?: (
    id: string,
    password: string,
  ) => Promise<void | { name?: string }>;
  /** jwtSecretKey. strongly recommend to provide custom value
   * @default 'nestjspackagesadmin' */
  jwtSecretKey?: string;
}

export const getOptionsWithDefault = (
  input: Partial<AdminModuleOptions>,
): AdminModuleOptions => ({
  path: '/admin',
  siteName: 'Nest.js admin',
  jwtSecretKey: 'nestjspackagesadmin',
  ...input,
});

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
