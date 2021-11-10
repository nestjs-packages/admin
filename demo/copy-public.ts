import * as fs from 'fs';
import * as fse from 'fs-extra';

const DIR = './dist/lib';

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

fse.copySync('../lib/public', './dist/lib/public', { overwrite: true });
