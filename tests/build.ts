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
  for (let inputLine of input.split('\n')) {
    let r = grammar.tokenizeLine(inputLine, ruleStack);
    lines.push(inputLine);
    for (let t of r.tokens) {
      // First element is always source.hledger. Drop it.
      t.scopes.shift();
      if (t.scopes.length == 0) {
        // If we have no scopes, skip
        continue;
      }
      let outputLine = '';
      let i = 0;
      for (; i < t.startIndex; i++) {
        if (inputLine.charAt(i) == '\t') {
          outputLine += '\t';
        } else {
          outputLine += ' ';
        }
      }
      for (; i < t.endIndex; i++) {
        outputLine += '^';
      }
      lines.push(outputLine);

      outputLine = '';
      for (i = 0; i < t.startIndex; i++) {
        outputLine += ' ';
      }
      outputLine += JSON.stringify(t.scopes);
      lines.push(outputLine);
    }
    ruleStack = r.ruleStack;
  }
  return lines.join('\n');
}
