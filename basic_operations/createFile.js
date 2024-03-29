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
  try {
    await writeFile(path.join(process.cwd(), fileName), '', { flag: 'ax' });
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default createFile;
