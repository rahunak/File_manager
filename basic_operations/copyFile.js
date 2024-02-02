import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'path';

async function copyFile(pathToFile, pathToNewDirectory) {
  if(pathToFile === undefined || pathToNewDirectory === undefined) {
    console.error('Operation failed');
    return;
  }
try {
  let pathToCopyFile = null;
  //Read more about this condition https://nodejs.org/api/path.html#windows-vs-posix
  if (process.platform === 'win32') {
    pathToCopyFile =  path.join(pathToNewDirectory, path.win32.basename(pathToFile));
  } else {
    pathToCopyFile = path.join(pathToNewDirectory, path.posix.basename(pathToFile));
  }
  await pipeline(
    createReadStream(pathToFile),
    createWriteStream(pathToCopyFile),
  );
} catch (error) {
  console.error('Operation failed');
}
}
export default copyFile;
