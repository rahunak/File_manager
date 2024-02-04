import path from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs/promises';

/**
 * Asynchronously copies a file from one location to another.
 *
 * @param {string} pathToFile - the path to the file to be copied
 * @param {string} pathToNewDirectory - the path to the new directory where the file will be copied
 * @return {Promise} a Promise that resolves when the file is successfully copied,
 * or rejects if an error occurs
 */
async function copyFile(pathToFile, pathToNewDirectory) {
  if (pathToFile === undefined || pathToNewDirectory === undefined) {
    console.error('Operation failed - Invalid input');
    return;
  }
  try {
    let pathToCopyFile = null;
    // Read more about this condition https://nodejs.org/api/path.html#windows-vs-posix
    // and here https://nodejs.org/api/path.html#pathbasenamepath-suffix
    if (process.platform === 'win32') {
      pathToCopyFile = path.join(
        pathToNewDirectory,
        path.win32.basename(pathToFile),
        path.extname(pathToFile),
      );
    }
    else if (process.platform === 'linux') {
      pathToCopyFile = path.join(pathToNewDirectory, path.posix.basename(pathToFile));
    }
    else {
      pathToCopyFile = path.join(pathToNewDirectory, path.basename(pathToFile));
    }
    // check on existing file
    const stats = await fs.stat(pathToFile);
    stats.isFile();
    await pipeline(
      createReadStream(pathToFile),
      createWriteStream(pathToCopyFile),
    );
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}

export default copyFile;
