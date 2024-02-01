import process from 'node:process';
import fs from 'fs';
import path from 'path';

function readFile(filePath) {
  try {
    const readableStream = fs.createReadStream(
      path.join(process.cwd(), filePath),
      'utf8',
    );
    readableStream.pipe(process.stdout);
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default readFile;
