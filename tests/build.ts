import * as vt from 'vscode-textmate/release/main';

export default function build(input: string) : string {
  const register = new vt.Registry();
  const grammar = register.loadGrammarFromPathSync("syntaxes/hledger.tmLanguage.json");

  let ruleStack = null;
  let lines = [];
  for (let line of input.split('\n')) {
    let r = grammar.tokenizeLine(line, ruleStack);
    lines.push(line);
    for (let t of r.tokens) {
      // First element is always source.hledger. Drop it.
      t.scopes.shift();
      if (t.scopes.length == 0) {
        // If we have no scopes, skip
        continue;
      }
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
