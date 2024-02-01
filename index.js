import process from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';
import readlinePromises from 'node:readline/promises';
import os from 'os';
import fs from 'fs';
import { currentPathMessage } from './helpers.js';
import changeDirectory from './navigation.js';
import listFolder from './list.js';

const readline = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let username = 'username';


function sayGoodbye() {
  if (username === 'username') {
    username = 'anonimous';
  }
  console.log('\x1b[33m%s\x1b[0m', `\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
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
  // Prepare command.
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
