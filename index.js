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
  const paddingLeft = Math.floor(((maxLengthOfWord + 2) - word.toString().length) / 2);
  const paddingRight = Math.ceil(((maxLengthOfWord + 2) - word.toString().length) / 2);
  return `${' '.repeat(paddingLeft)}${word}${' '.repeat(paddingRight)}`;
  // console.log('\x1b[32m%s\x1b[0m', `|${' '.repeat(padding)}${word}${' '.repeat(padding)}|`);
}
async function listFolder() {
  // read current directory
  const files = await readdir(process.cwd());
  // find max length of word in folder.
  const maxLength = files.reduce((acc, curr) => {
    if (acc < curr.length) {
      return curr.length;
    }
    return acc;
  }, 0);
  // print head of table
  console.log(`|${'_'.repeat(maxLength + 24)}`);
  console.log(`|${`${formattedOuptut(7, '(index)')}|${formattedOuptut(maxLength, 'Name')}`}|${formattedOuptut(6, 'Type')}|`);
  console.log(`|${'—'.repeat(maxLength + 24)}`);
  // prepare the body of table
  const arrLists = [];
  files.forEach((file) => {
    const newPromise = new Promise((resolve) => {
      stat(file, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        const dirOrFile = stats.isDirectory() ? formattedOuptut(6, 'Folder') : formattedOuptut(6, 'File');
        resolve({ type: stats.isDirectory() ? 'Folder' : 'File', fileName: file, str: `|${formattedOuptut(maxLength, file)}|${dirOrFile}|` });
      });
    });
    arrLists.push(newPromise);
  });
  const result = await Promise.allSettled(arrLists).then((data) => data.sort((a, b) => {
    // Compare folder and file types
    if (a.value.type !== b.value.type) {
      return a.value.type === 'Folder' ? -1 : 1;
    }
    // Compare file names
    return a.value.fileName.toLowerCase().localeCompare(b.value.fileName.toLowerCase());
  }));
  // prepare body: sorting
  // pring body of table
  result.forEach((val, index) => {
    console.log(`|${formattedOuptut(7, index + 1)}${val.value.str}`);
  });
  // print bottom of table
  console.log(`${'‾'.repeat(maxLength + 24)}`);
}
function changeDirectory(destination) {
  console.log('change directory', destination);
  if (destination === undefined) {
    process.chdir(path.resolve(process.cwd(), '..'));
  }
  else {
    process.chdir(path.resolve(process.cwd(), destination));
  }
}
function checkInputArgs() {
  const argsFromCLI = process.argv.slice(2);

  argsFromCLI.forEach((val) => {
    if (val.startsWith('--username=')) {
      username = val.replace('--username=', '');
      console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager, ${username}`);
      currentPathMessage();
    }
  });
  if (username === 'username') {
    console.log('\x1b[31m%s\x1b[0m', 'Invalid input, havent arg: --username=your_username');
  }
}

async function commandHandler(inputData) {
  // prepare command
  const commandArgs = inputData.trim().split(' ');
  const [, ...args] = commandArgs;
  const command = commandArgs[0];

  // dont forget to remove extra console.log
  // console.log('\n inputData', inputData);
  // console.log('\n args', args);
  // console.log('\n command', command);

  switch (command.trim()) {
    case 'up':
      console.log('go up to directory');
      changeDirectory();
      break;
    case 'cd':
      if (args[0] === undefined) {
        console.log('Invalid input');
        break;
      }
      changeDirectory(args[0]);
      break;
    case 'ls':
      console.log('list all files in current directory');
      await listFolder();
      currentPathMessage();
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
  // go to home directory
  process.chdir(os.homedir());
  readline.on('SIGINT', () => sayGoodbye());
  checkInputArgs();
  readline.on('line', (command) => {
    commandHandler(command);
    currentPathMessage();
  });
};

init();
