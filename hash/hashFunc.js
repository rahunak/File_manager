import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

function hashFunc(pathToFile) {
  try {
    createReadStream(pathToFile)
      .pipe(createHash('sha256'))
      .setEncoding('hex')
      .pipe(process.stdout)
      .on('unpipe', () => console.log());
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default hashFunc;
