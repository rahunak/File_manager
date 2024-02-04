import path from 'path';
import { writeFile } from 'node:fs/promises';

/**
 * Asynchronously creates a file with the specified file name.
 *
 * @param {string} fileName - the name of the file to be created
 * @return {Promise<void>} a promise that resolves when the file is successfully created,
 * or rejects with an error
 */
async function createFile(fileName) {
  // const writeStream = fs.createWriteStream(path.join(process.cwd(), fileName), { flags: 'ax' });
  // writeStream.on('error', () => {
  //   console.error('Operation failed');
  // });
  try {
    await writeFile(path.join(process.cwd(), fileName), '', { flags: 'ax' });
  }
  catch (err) {
    console.error('Operation failed');
  }
}
export default createFile;
