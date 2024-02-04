import { promises as fs } from 'fs';
import path from 'path';

async function removeFile(pathToFile) {
  if (pathToFile === undefined) {
    console.error('Operation failed - Invalid input');
    return;
  }
  try {
    await fs.rm(path.join(process.cwd(), pathToFile));
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default removeFile;
