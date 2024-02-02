import fs from 'fs';
import path from 'path';

async function createFile(fileName) {
  const writeStream = fs.createWriteStream(path.join(process.cwd(), fileName), { flags: 'ax' });
  writeStream.on('error', () => {
    console.error('Operation failed');
  });
}
export default createFile;
