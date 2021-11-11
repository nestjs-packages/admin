import { DynamicModule, Module, NestModule, Type } from '@nestjs/common';
import { HttpAdapterHost, RouterModule } from '@nestjs/core';
import { join } from 'path';

import { AdminModuleOptions } from './common';
import { AppModule, AuthModule, EntitiesModule } from './modules';

import { AdminEnvironment } from './admin-environment';
import { ADMIN_MODULE_OPTIONS } from './admin.constants';

@Module({})
export class AdminCoreModule implements NestModule {
  static register(options: AdminModuleOptions = {}): DynamicModule {
    const adminModuleOptions = {
      provide: ADMIN_MODULE_OPTIONS,
      useValue: options,
    };
    const providers = [adminModuleOptions, AdminEnvironment];

    return {
      global: true,
      module: AdminCoreModule,
      imports: this.createModuleImports(options.path),
      providers,
      exports: providers,
    };
  }

  private static createModuleImports(
    path = '/admin',
  ): (DynamicModule | Type<unknown>)[] {
    const modules = [AppModule, AuthModule, EntitiesModule];

    return [
      ...modules,
      RouterModule.register([
        {
          path,
          module: AdminCoreModule,
          children: modules,
        },
      ]),
    ];
  }

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  configure() {
    this.adapterHost.httpAdapter.useStaticAssets(join(__dirname, 'public'));
  }
}
