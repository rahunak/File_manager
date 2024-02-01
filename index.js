import process from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';
import readlinePromises from 'node:readline/promises';
import os from 'os';
import fs from 'fs';
import { stat } from 'node:fs';
import { readdir } from 'node:fs/promises';

const readline = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let username = 'username';

function currentPathMessage() {
  // const dirname = path.dirname(fileURLToPath(import.meta.url));
  console.log('You are currently in:', process.cwd());
}
function sayGoodbye() {
  if (username === 'username') {
    username = 'anonimous';
  }
  console.log('\x1b[33m%s\x1b[0m', `\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}
function formattedOuptut(maxLengthOfWord, word) {
  const paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.length) / 2);
  const paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.length) / 2);
  return `|${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
  // console.log('\x1b[32m%s\x1b[0m', `|${' '.repeat(padding)}${word}${' '.repeat(padding)}|`);
}
async function listFolder() {
  const files = await readdir(process.cwd());
  console.log('files', files);
  // find max length of word in folder.
  const maxLength = files.reduce((acc, curr) => {
    if (acc < curr.length) {
      return curr.length;
    }
    return acc;
  }, 0);
  // print head of table
  console.log('_'.repeat(maxLength + 24));
  console.log(`${formattedOuptut(7, '(index)') + formattedOuptut(maxLength, 'Name')} ${formattedOuptut(6, 'Type')}|`);
  console.log('—'.repeat(maxLength + 24));
  // prepare the body of table
  const arrLists = [];
  files.forEach((file, index) => {
    const newPromise = new Promise((resolve) => {
      stat(file, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        const dirOrFile = stats.isDirectory() ? formattedOuptut(6, 'Folder') : formattedOuptut(6, 'File');
        resolve(`|${(index + 1).toString().padStart(8, ' ')} ${formattedOuptut(maxLength, file)} ${dirOrFile}|`);
      });
    });
    arrLists.push(newPromise);
  });
  const result = await Promise.allSettled(arrLists).then((data) => data);
  // pring body of table
  result.forEach((val) => {
    console.log(val.value);
  });
  // print bottom of table
  console.log(`${'‾'.repeat(maxLength + 24)}`);
}
function checkInputArgs() {
  const argsFromCLI = process.argv.slice(2);

  argsFromCLI.forEach((val) => {
    if (val.startsWith('--username=')) {
      username = val.replace('--username=', '');
      console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager,${username}`);
      currentPathMessage();
    }
  });
  if (username === 'username') {
    console.log('\x1b[31m%s\x1b[0m', 'Invalid input, havent arg: --username=your_username');
  }
}

function commandHandler(inputData) {
  // prepare command
  const commandArgs = inputData.trim().split(' ');
  const [, ...args] = commandArgs;
  const command = commandArgs[0];
  console.log('\n inputData', inputData);
  console.log('\n args', args);
  console.log('\n command', command);
  switch (command.trim()) {
    case 'up':
      console.log('go up to directory');
      break;
    case 'cd':
      console.log('go down to directory');
      break;
    case 'ls':
      console.log('list all files in current directory');
      listFolder();
      break;
    case 'cat':
      console.log('cat  y');
      break;
    case 'add':
      console.log('add  ');
      break;
    case 'rn':
      console.log('rename  y');
      break;
    case 'cp':
      console.log('cp  y');
      break;
    case 'mv':
      console.log('move ');
      break;
    case 'os':
      console.log('os - arguments?');
      break;
    case 'hash':
      console.log('hash');
      break;
    case 'compress':
      console.log('compress');
      break;
    case 'decompress':
      console.log('decompress');
      break;
    case '.exit':
      sayGoodbye();
      process.exit();
      break;
    default:
      console.log('Invalid input');
  }
}

const init = () => {
  process.chdir(os.homedir());
  readline.on('SIGINT', () => sayGoodbye());
  checkInputArgs();
  readline.on('line', (command) => {
    commandHandler(command);
    currentPathMessage();
  });
};

init();
