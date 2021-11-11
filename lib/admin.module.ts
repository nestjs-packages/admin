import { DynamicModule, Module } from '@nestjs/common';

import { AdminModuleAsyncOptions, AdminModuleOptions } from './common';

import { AdminCoreModule } from './admin-core.module';

@Module({})
export class AdminModule {
  static register(options?: AdminModuleOptions): DynamicModule {
    return {
      module: AdminModule,
      imports: [AdminCoreModule.register(options)],
    };
  }

  static registerAsync(options?: AdminModuleAsyncOptions): DynamicModule {
    return {
      module: AdminModule,
      imports: [AdminCoreModule.registerAsync(options)],
    };
  }
}
