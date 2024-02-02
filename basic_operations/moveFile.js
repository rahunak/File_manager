import { pipeline } from 'node:stream/promises';
import { promises as fs } from 'fs';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

async function moveFile(pathToFile, pathToNewDirectory) {
  if (pathToFile === undefined || pathToNewDirectory === undefined) {
    console.error('Operation failed');
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
    else {
      pathToCopyFile = path.join(pathToNewDirectory, path.posix.basename(pathToFile));
    }
    await pipeline(
      createReadStream(pathToFile),
      createWriteStream(pathToCopyFile),
    );
    await fs.rm(path.join(process.cwd(), pathToFile));
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default moveFile;
