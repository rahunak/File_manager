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

/**
 * Function to say goodbye to the user and exit the process.
 *
 * @param {}
 * @return {}
 */
function sayGoodbye() {
  if (username === 'username') {
    username = 'anonimous';
  }
  console.log('\x1b[33m%s\x1b[0m', `\nThank you for using File Manager, ${username}, goodbye!`);
  process.exit();
}

/**
 * Check the command line arguments for a username and display a greeting.
 *
 * @param {Array} argsFromCLI - the command line arguments
 * @return {undefined}
 */
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

/**
 * Asynchronous function to handle different commands based on user input.
 *
 * @param {string} inputData - The input data containing the command and arguments.
 * @return {void} No return value
 */
async function commandHandler(inputData) {
  // Prepare command.
  const commandArgs = inputData.trim().split(' ');
  const firstArg = inputData.trim().split(' ')[1];
  const secondArg = inputData.trim().split(' ')[2];
  const [, ...args] = commandArgs;
  const command = commandArgs[0];

  switch (command.trim()) {
    case 'up':
      // up
      if (!isArgsOK(inputData, 0)) {
        console.log('Invalid input');
      }
      else {
        goUp();
      }
      break;
    case 'cd':
      // cd path_to_directory
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
      }
      else {
        goDown(firstArg);
      }
      break;
    case 'ls':
      // ls
      if (!isArgsOK(inputData, 0)) {
        console.log('Invalid input');
        break;
      }
      else {
        await listFolder();
      }
      break;
    case 'cat':
      // cat path_to_file
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await readFile(firstArg);
      }
      break;
    case 'add':
      // add new_file_name
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await createFile(firstArg);
      }
      break;
    case 'rn':
      // rn path_to_file new_filename
      if (!isArgsOK(inputData, 2)) {
        console.log('Invalid input');
        break;
      }
      else {
        await renameFile(firstArg, secondArg);
      }
      break;
    case 'cp':
      // cp path_to_file path_to_new_directory
      if (!isArgsOK(inputData, 2)) {
        console.log('Invalid input');
        break;
      }
      else {
        await copyFile(firstArg, secondArg);
      }
      break;
    case 'mv':
      // mv path_to_file path_to_new_directory
      if (!isArgsOK(inputData, 2)) {
        console.log('Invalid input');
        break;
      }
      else {
        await moveFile(firstArg, secondArg);
      }
      break;
    case 'rm':
      // rm path_to_file
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await removeFile(firstArg);
      }
      break;
    case 'os':
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await getOSInfo(firstArg);
      }
      break;
    case 'hash':
      // hash path_to_file
      if (!isArgsOK(inputData, 1)) {
        console.log('Invalid input');
        break;
      }
      else {
        await hashFunc(firstArg);
      }
      break;
    case 'compress':
      // compress path_to_file path_to_destination
      if (!isArgsOK(inputData, 2)) {
        console.log('Invalid input');
        break;
      }
      else {
        await compressFunc(firstArg, secondArg);
      }
      break;
    case 'decompress':
      // decompress path_to_file path_to_destination
      if (!isArgsOK(inputData, 2)) {
        console.log('Invalid input');
        break;
      }
      else {
        await decompressFunc(firstArg, secondArg);
      }
      break;
    case '.exit':
      sayGoodbye();
      process.exit();
      break;
    case '':
      break;
    default:
      console.log('Invalid input');
      break;
  }

  currentPathMessage();
}

/**
 * Initializes the application by navigating to the home directory,
 * setting up event listeners for user input,
 * and handling any errors that occur during the process.
 *
 * @param None
 * @return None
 */
const init = () => {
  // go to home directory
  try {
    process.chdir(os.homedir());
  }
  catch (err) {
    console.error('Operation failed', err);
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
  console.error('Operation failed', err);
}
