import * as vscode from "vscode";
import { exec as execOriginal } from "child_process";
import { promisify } from "util";

const exec = promisify(execOriginal);

const extensionName = "hledger";

export function activate(context: vscode.ExtensionContext) {
  const accountAutocompleteProviderSubscription =
    vscode.languages.registerCompletionItemProvider("hledger", {
      async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
      ) {
        const text = document.lineAt(position).text;
        if (text.match(/^\s/)) {
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

export function deactivate() {}
