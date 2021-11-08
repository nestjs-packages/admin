import { DynamicModule, Module } from '@nestjs/common';

import { AdminCoreModule } from './core/admin-core.module';
import { AdminModuleAsyncOptions, AdminModuleOptions } from './interfaces';

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
