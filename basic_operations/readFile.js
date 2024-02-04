import { readFile } from 'node:fs/promises';

/**
 * Read the file at the specified filePath and log its contents,
 * or log an error message if the operation fails.
 *
 * @param {string} filePath - the path to the file to be read
 * @return {Promise<void>} a Promise that resolves when the file is successfully read,
 * or rejects if an error occurs
 */
async function readFileFunc(filePath) {
  try {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default readFileFunc;
