import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

interface TemplateParameters {
  request: Request;
  [k: string]: any;
}

@Injectable()
export class AdminEnvironment {
  private env: nunjucks.Environment;

  constructor() {
    this.env = nunjucks.configure(join(__dirname, 'public', 'views'), {
      noCache: true,
    });
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
