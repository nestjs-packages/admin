import {
  DynamicModule,
  Module,
  NestModule,
  Provider,
  Type,
} from '@nestjs/common';
import { HttpAdapterHost, RouterModule } from '@nestjs/core';
import { join } from 'path';

import {
  AdminModuleAsyncOptions,
  AdminModuleOptions,
  AdminOptionsFactory,
} from './common';
import { AppModule, AuthModule, EntitiesModule } from './modules';

import { AdminEnvironment } from './admin-environment';
import { ADMIN_MODULE_OPTIONS } from './admin.constants';

@Module({})
export class AdminCoreModule implements NestModule {
  static register(options: AdminModuleOptions = {}): DynamicModule {
    const optionsProvider = {
      provide: ADMIN_MODULE_OPTIONS,
      useValue: options,
    };
    const providers = [optionsProvider, AdminEnvironment];

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

  static registerAsync(options: AdminModuleAsyncOptions = {}): DynamicModule {
    const providers = [...this.createAsyncProviders(options), AdminEnvironment];

    return {
      global: true,
      module: AdminCoreModule,
      imports: (options.imports || []).concat(
        this.createModuleImports(options.path),
      ),
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: AdminModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AdminModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ADMIN_MODULE_OPTIONS,
        useFactory: async (...args) => ({
          ...(await options.useFactory(...args)),
          path: options.path,
        }),
        inject: options.inject || [],
      };
    }
    return {
      provide: ADMIN_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AdminOptionsFactory) => ({
        ...(await optionsFactory.createAdminOptions()),
        path: options.path,
      }),
      inject: [options.useExisting || options.useClass],
    };
  }

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  configure() {
    this.adapterHost.httpAdapter.useStaticAssets(join(__dirname, 'public'));
  }
}
