import * as assert from 'assert';
import * as fs from 'fs';
import build from './build';

let files = fs.readdirSync('tests/cases/', {encoding:'utf8'}).filter(f => f.match(/.in.hledger$/));

describe('Hledger test case files. build($name.in.hledger)=$name.want', () => {
  for (let f of files) {
    it(f, async () => {
      let inHledger = fs.readFileSync(`tests/cases/${f}`, {encoding: 'utf8'});
      let wantFilename = 'tests/cases/' + f.substring(0, f.length - '.in.hledger'.length) + '.want';
      let want = fs.readFileSync(wantFilename, {encoding: 'utf8'});
      let got = await build(inHledger);
      assert.equal(got, want);
    });
  }
});
