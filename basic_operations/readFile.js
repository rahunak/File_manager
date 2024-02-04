import { readFile } from 'node:fs/promises';

async function readFileFunc(filePath) {
  try {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  }
  catch (err) {
    console.error('Operation failed');
  }
}
export default readFileFunc;
