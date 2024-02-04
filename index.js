import os from 'os';
import process from 'node:process';
import readlinePromises from 'node:readline/promises';
import hashFunc from './hash/hashFunc.js';
import { currentPathMessage, isArgsOK } from './helpers.js';
import { goUp, goDown } from './nav_and_work/navigation.js';
import listFolder from './nav_and_work/listFolder.js';
import readFile from './basic_operations/readFile.js';
import createFile from './basic_operations/createFile.js';
import renameFile from './basic_operations/renameFile.js';
import copyFile from './basic_operations/copyFile.js';
import moveFile from './basic_operations/moveFile.js';
import removeFile from './basic_operations/removeFile.js';
import getOSInfo from './operating_system_info/index_getOSInfo.js';
import compressFunc from './compress_decompress/compressFunc.js';
import decompressFunc from './compress_decompress/decompressFunc.js';

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

function greetingCheck() {
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

  switch (command.trim()) {
    case 'up':
      if (!isArgsOK(inputData, 0)) {
        console.log('Invalid input');
      }
      else {
        goUp();
      }
      break;
    case 'cd':
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
      }
      else {
        goDown(inputData.trim().split(' ')[1]);
      }
      break;
    case 'ls':
      if (!isArgsOK(inputData, 0)) {
        console.log('Invalid input');
        break;
      }
      else {
        await listFolder();
      }
      break;
    case 'cat':
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await readFile(inputData.trim().split(' ')[1]);
      }
      break;
    case 'add':
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        console.log('add inputData', inputData, 'split', inputData.trim().split(' ')[1]);
        await createFile(inputData.trim().split(' ')[1]);
      }
      // createFile(args[0]);
      break;
    case 'rn':
      renameFile(args[0], args[1]);
      break;
    case 'cp':
      copyFile(args[0], args[1]);
      break;
    case 'mv':
      moveFile(args[0], args[1]);
      break;
    case 'rm':
      removeFile(args[0]);
      break;
    case 'os':
      getOSInfo(args[0]);
      break;
    case 'hash':
      hashFunc(args[0]);
      break;
    case 'compress':
      compressFunc(args[0], args[1]);
      break;
    case 'decompress':
      decompressFunc(args[0], args[1]);
      break;
    case '.exit':
      sayGoodbye();
      process.exit();
      break;
    default:
      console.log('Invalid input');
  }

  currentPathMessage();
}

const init = () => {
  // go to home directory
  try {
    process.chdir(os.homedir());
  }
  catch (err) {
    console.error('Operation failed');
  }
  readline.on('SIGINT', () => sayGoodbye());
  greetingCheck();
  readline.on('line', (command) => {
    commandHandler(command);
  });
};

try {
  init();
}
catch (err) {
  console.error('Operation failed');
}
