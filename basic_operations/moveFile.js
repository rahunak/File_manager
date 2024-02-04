import { pipeline } from 'node:stream/promises';
import { promises as fs } from 'fs';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

/**
 * Asynchronously moves a file from one directory to another.
 *
 * @param {string} pathToFile - the path to the file to be moved
 * @param {string} pathToNewDirectory - the path to the new directory where the file will be moved
 * @return {void}
 */
async function moveFile(pathToFile, pathToNewDirectory) {
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
    const stats = await fs.stat(pathToFile);
    stats.isFile();
    await pipeline(
      createReadStream(pathToFile, { flags: 'r' }),
      createWriteStream(pathToCopyFile, { flags: 'wx' }),
    );
    await fs.rm(pathToFile);
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default moveFile;
