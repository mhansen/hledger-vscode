import * as fs from 'fs';
import * as vsctm from 'vscode-textmate/release/main';
import * as oniguruma from 'oniguruma';

export default async function build(input: string) : Promise<string> {
  const registry = new vsctm.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (sources) => new oniguruma.OnigScanner(sources),
      createOnigString: (str) => new oniguruma.OnigString(str)
    }),
    loadGrammar: async (scopeName: string) => {
      // https://github.com/textmate/javascript.tmbundle/blob/master/Syntaxes/JavaScript.plist
      const fileName = 'syntaxes/hledger.tmLanguage.json';
      if (scopeName === 'source.hledger') {
        let g = vsctm.parseRawGrammar(fs.readFileSync(fileName).toString(), fileName)
        return g;
      }
      console.log(`Unknown scope name: ${scopeName}`);
      return null;
    }
  });
  const grammar = await registry.loadGrammar('source.hledger');

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
