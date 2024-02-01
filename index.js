import process from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';
import readlinePromises from 'node:readline/promises';

const readline = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let username = 'username';

function currentPathMessage(pathUri) {
  console.log('You are currently in:', pathUri);
}
function sayGoodbye() {
  console.log('\x1b[33m%s\x1b[0m', `\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}
function commandHandler(command) {
  switch (command) {
    case 'mkdir':
      console.log('mkdir');
      break;
    case 'touch':
      console.log('touch');
      break;
    case '.exit':
      sayGoodbye();
      process.exit();
      break;
    default:
      console.log('Invalid input');
  }
}

function handleCommands() {
  readline.on('line', (command) => {
    console.log(`line ${command}!`);
    commandHandler(command);
  });
}

const init = () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const argsFromCLI = process.argv.slice(2);

  argsFromCLI.forEach((val) => {
    if (val.startsWith('--username=')) {
      username = val.replace('--username=', '');
      console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager,${username}`);
      currentPathMessage(dirname);
    }
  });
  readline.on('SIGINT', () => sayGoodbye());
  handleCommands();
};

init();
