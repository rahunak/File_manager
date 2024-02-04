import path from 'path';
import os from 'os';

/**
 * Move the current working directory up one level,
 * but unless the current directory is already the user's home directory.
 *
 * @return {undefined}
 */
function goUp() {
  try {
    if (process.cwd() === os.homedir()) {
      return;
    }
    process.chdir(path.resolve(process.cwd(), '..'));
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}

/**
 * Change the current working directory to the specified path, catching any errors that occur.
 *
 * @param {string} pathDestination - the destination path to change to
 * @return {void}
 */
function goDown(pathDestination) {
  try {
    if (pathDestination.trim() === '..') {
      return;
    }
    process.chdir(path.resolve(process.cwd(), pathDestination));
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export { goUp, goDown };
