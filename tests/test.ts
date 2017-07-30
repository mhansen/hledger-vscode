import * as assert from 'assert';
import * as fs from 'fs';
import build from './build';

let files = [
  "Accounts",
  "AccountsLowercase",
  "CommentsSemicolon",
  "CommentsOctothorpe",
  "Currencies",
  "Dates",
  "Include",
];

describe('Hledger test case files. build($name.in.hledger)=$name.want', () => {
  for (let f of files) {
    it(f, () => {
      let inHledger = fs.readFileSync(`tests/cases/${f}.in.hledger`, {encoding: 'utf8'});
      let want = fs.readFileSync(`tests/cases/${f}.want`, {encoding: 'utf8'});
      let got = build(inHledger);
      assert.equal(got, want);
    });
  }
});
