import os from 'os';
import process from 'node:process';
import readlinePromises from 'node:readline/promises';
import { currentPathMessage } from './helpers.js';
import changeDirectory from './nav_and_work/navigation.js';
import listFolder from './nav_and_work/list.js';
import readFile from './basic_operations/readFile.js';
import createFile from './basic_operations/createFile.js';
import renameFile from './basic_operations/renameFile.js';
import copyFile from './basic_operations/copyFile.js';
import moveFile from './basic_operations/moveFile.js';
import removeFile from './basic_operations/removeFile.js';
import getOSInfo from './operating_system_info/index_getOSInfo.js';

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
      await listFolder();
      currentPathMessage();
      break;
    case 'cat':
      readFile(args[0]);
      break;
    case 'add':
      createFile(args[0]);
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
  try {
    process.chdir(os.homedir());
  }
  catch (err) {
    console.error('Operation failed');
  }
  readline.on('SIGINT', () => sayGoodbye());
  checkInputArgs();
  readline.on('line', (command) => {
    if (command !== '') {
      commandHandler(command);
    }
    currentPathMessage();
  });
};

try {
  init();
}
catch (err) {
  console.error('Operation failed');
}
