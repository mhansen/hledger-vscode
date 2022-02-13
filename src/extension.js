const vscode = require('vscode');
const child_process = require('child_process');
const util = require('util');

const exec = util.promisify(child_process.exec);

const extensionName = "hledger";

function activate(context) {
  const accountAutocompleteProviderSubscription =
    vscode.languages.registerCompletionItemProvider("hledger", {
      async provideCompletionItems(
        document,
        position,
        token,
        context
      ) {
        const text = document.lineAt(position).text;
        if (!text.match(/^\s/)) {
          // Do not provide account name completions if the line is not indented.
          return;
        }

        const configuration = vscode.workspace.getConfiguration();
        const hledgerPath = configuration.get(
          `${extensionName}.hledgerPath`,
          "hledger"
        );
        const ledgerFile = configuration.get(`${extensionName}.ledgerFile`, "");

        const env = process.env;
        if (ledgerFile) {
          env.LEDGER_FILE = ledgerFile;
        }
        const { stdout } = await exec(`"${hledgerPath}" accounts`, { env });
        const accountNames = stdout
          .split("\n")
          .map((x) => x.trim())
          .filter((x) => x);

        return accountNames.map((x) => new vscode.CompletionItem(x));
      },
    });
  context.subscriptions.push(accountAutocompleteProviderSubscription);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
