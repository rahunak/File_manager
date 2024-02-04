import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

/**
 * This function creates a hash of the file located at the specified path using the sha256 algorithm
 *
 * @param {string} pathToFile - the path to the file for which the hash is to be created
 * @return {void} This function does not return a value
 */
function hashFunc(pathToFile) {
  try {
    const rs = createReadStream(pathToFile);
    rs.on('error', (err) => console.error('Operation failed', err));
    rs.pipe(createHash('sha256'))
      .setEncoding('hex')
      .pipe(process.stdout);
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default hashFunc;
