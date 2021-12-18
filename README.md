[![](https://img.shields.io/visual-studio-marketplace/v/mark-hansen.hledger-vscode)](https://marketplace.visualstudio.com/items?itemName=mark-hansen.hledger-vscode)
[![](https://img.shields.io/visual-studio-marketplace/i/mark-hansen.hledger-vscode)](https://marketplace.visualstudio.com/items?itemName=mark-hansen.hledger-vscode)

# hledger-vscode README

Language support for [HLedger](http://hledger.org/) command-line accounting [journal files](http://hledger.org/journal.html).

## Features

- Syntax highlighting

![Syntax Highlighting](https://raw.githubusercontent.com/mhansen/hledger-vscode/main/images/screenshot.png)

![Highlighting of tags](https://raw.githubusercontent.com/mhansen/hledger-vscode/main/images/feature-tags.png)

### Todo:

- Account Tab Completion

## Known Issues

- No highlighting of amounts (numbers)

## Development

### Updating Tests

We have golden file tests under `tests/cases`, containing example
`.in.hledger` files, and syntax-highlighted `.want` files. Run the tests with
`npm test`.

If you've examined the differences and they're expected, rebuild the golden
files by running `npm run-script goldens`.
