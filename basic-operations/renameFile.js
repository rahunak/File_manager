import fs from 'fs/promises';
import path from 'path';

async function renameFile(pathToFile, newFilename) {
  // fs.rename(
  // oldFile
  // newFile
  // );
  try {
    const extentionFile = path.extname(pathToFile);
    console.log(extentionFile);
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
