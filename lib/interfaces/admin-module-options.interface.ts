import { ModuleMetadata, Type } from '@nestjs/common';

export interface AdminModuleOptions {
  /** (currently not working)
   *  @default '/admin'  */
  path?: string;

  /** currently not working
   *  @default () => true  */
  authenticate?: () => void;
}

export interface AdminOptionsFactory {
  createAdminOptions(): Promise<AdminModuleOptions> | AdminModuleOptions;
}

export interface AdminModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AdminOptionsFactory>;
  useClass?: Type<AdminOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AdminModuleOptions> | AdminModuleOptions;
  inject?: any[];
}
