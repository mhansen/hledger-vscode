import * as vt from 'vscode-textmate/release/main';
import * as fs from 'fs';
import * as parseArgs from 'minimist';

function parseHledger(input: string) : string {
  const register = new vt.Registry();
  const grammar = register.loadGrammarFromPathSync("../syntaxes/hledger.tmLanguage.json");

  let ruleStack = null;
  let lines = [];
  for (let line of input.split('\n')) {
    let r = grammar.tokenizeLine(line, ruleStack);
    lines.push(line);
    for (let t of r.tokens) {
      let line = '';
      let i = 0;
      for (; i < t.startIndex; i++) {
        line += ' ';
      }
      for (; i < t.endIndex; i++) {
        line += '^';
      }
      lines.push(line);
      line = '';
      for (i = 0; i < t.startIndex; i++) {
        line += ' ';
      }
      line += JSON.stringify(t.scopes);
      lines.push(line);
    }
    ruleStack = r.ruleStack;
  }
  return lines.join('\n');
}

for (let arg of parseArgs(process.argv.slice(2))._) {
  console.log(parseHledger(fs.readFileSync(arg, {encoding:'utf8'})));
}

