import * as fs from 'fs';
import * as path from 'path';
import build from './build';

async function main() {
  const testsPath = "./tests/cases";
  const inFiles = fs.readdirSync(testsPath, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(".in.hledger"))
    .map((file) => path.join(testsPath, file.name));

  for (let inFile of inFiles) {
    let outFile = inFile.substring(0, inFile.length - ".in.hledger".length) + ".want";
    let converted: string = await build(fs.readFileSync(inFile, { encoding: 'utf8' }));
    fs.writeFileSync(outFile, converted, { encoding: 'utf8' });
  }
}

main();
