import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

function hashFunc(pathToFile) {
  try {
    const rs = createReadStream(pathToFile);
    rs.on('error', () => console.error('Operation failed'));
    rs.pipe(createHash('sha256'))
      .setEncoding('hex')
      .pipe(process.stdout)
      .on('unpipe', () => console.log());
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default hashFunc;
