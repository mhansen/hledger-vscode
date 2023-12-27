# Change Log

## 0.0.11

- Fixed some comment support:
   - `#` now only highlights as a comment at the start of a line
   - Stopped incorrectly highlighting `#` and `*` in transaction descriptions as comments

## 0.0.10

- Add highlighting for [auxiliary/secondary dates](https://hledger.org/1.27/hledger.html#secondary-dates).

## 0.0.9

- Add new currency symbol for India Rupee ₹

## 0.0.7

- Fix images in README to render.

## 0.0.6

- Supports arbitrary account names, not just Income/Expenses/Assets/Liabilities/Equity.
   - Fixed #6
   - now you can use your native language e.g. Inntekter rather than Income
   - Or Revenue rather than Income, if you like
- Better support for highlighting accounts in account alias descriptions.
- Supports more valid characters in accounts: `%`, `|`, `[`, `]`, `(`, `)` all valid.

## 0.0.5

- Highlight the transaction description

## 0.0.2

- Added support for special characters in account names
- Added support for spaces in account names
- This extension now also triggers on the .journal file extension
- Added highlighting for many more currencies.

## 0.0.1

Initial release of hledger-vscode.
- Syntax highlighting of comments, dates, tags, accounts, directive keywords.
