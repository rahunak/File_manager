import process from 'node:process';
import fs from 'fs';
import path from 'path';

function readFile(filePath) {
  console.log('readFile', filePath);

  const readableStream = fs.createReadStream(
    path.join(process.cwd(), filePath),
    'utf8',
  );
  readableStream.on('error', () => {
    console.error('Operation failed');
  });
  readableStream.pipe(process.stdout);
}
export default readFile;
