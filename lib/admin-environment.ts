import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

import { AdminModuleOptions } from './common';
import { ADMIN_MODULE_OPTIONS } from './admin.constants';

interface TemplateParameters {
  request: Request;
  [k: string]: any;
}

@Injectable()
export class AdminEnvironment {
  private env: nunjucks.Environment;

  constructor(
    @Inject(ADMIN_MODULE_OPTIONS)
    private options: AdminModuleOptions,
  ) {
    this.env = nunjucks.configure(join(__dirname, 'views'), {
      noCache: true,
    });

    this.env.addGlobal('rootPath', this.options.path ?? '/admin');
    this.env.addGlobal('siteName', this.options.siteName ?? 'Nest.js Admin');
  }

  async render(name: string, parameters: TemplateParameters) {
    const templateParameters = {
      ...parameters,
      // messages: parameters.request.flash('messages'),
      // flash: parameters.request.flash(),
    };

    const prom = new Promise((resolve, reject) => {
      this.env.render(name, templateParameters, function (err, res) {
        if (err) {
          reject(err);
          return err;
        }
        resolve(res);
        return res;
      });
    });
    const rendered = await prom;
    return rendered;
  }
}
