import * as fs from 'fs';
import build from './build';
import * as parseArgs from 'minimist';

for (let arg of parseArgs(process.argv.slice(2))._) {
  console.log(build(fs.readFileSync(arg, {encoding:'utf8'})));
}
