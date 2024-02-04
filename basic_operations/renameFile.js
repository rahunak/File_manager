import fs from 'fs/promises';
import path from 'path';

/**
 * Asynchronously renames a file at the given path to a new filename.
 *
 * @param {string} pathToFile - the path to the file to be renamed
 * @param {string} newFilename - the new filename to rename the file to
 * @return {Promise<void>} a Promise that resolves when the file is successfully renamed
 */
async function renameFile(pathToFile, newFilename) {
  // fs.rename(oldFile, newFile);
  try {
    const extentionFile = path.extname(pathToFile);

    await fs.rename(
      path.join(process.cwd(), pathToFile),
      path.join(process.cwd(), path.dirname(pathToFile), newFilename + extentionFile),
    );
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}

export default renameFile;
