import { promises as fs } from 'fs';
import path from 'path';

async function removeFile(pathToFile) {
  if (pathToFile === undefined) {
    console.error('Operation failed');
    return;
  }
  try {
    await fs.rm(path.join(process.cwd(), pathToFile));
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default removeFile;
