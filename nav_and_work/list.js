import { readdir } from 'node:fs/promises';
import { stat } from 'node:fs';
import { formattedOuptut } from '../helpers.js';

async function listFolder() {
  // read current directory
  const files = await readdir(process.cwd());
  // find max length of word in folder.
  const maxLength = files.reduce((acc, curr) => {
    if (acc < curr.length) {
      return curr.length;
    }
    return acc;
  }, 0);
    // Print head of table
  console.log(` ${'_'.repeat(maxLength + 21)}`);
  console.log(`|${`${formattedOuptut(7, '(index)')}|${formattedOuptut(maxLength, 'Name')}`}|${formattedOuptut(6, 'Type')}|`);
  console.log(`|${'—'.repeat(maxLength + 21)}|`);
  // Prepare the body of table.
  const arrLists = [];
  files.forEach((file) => {
    // can be rewritten with util.promisify(original)
    const newPromise = new Promise((resolve) => {
      stat(file, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        const dirOrFile = stats.isDirectory() ? formattedOuptut(6, 'Folder') : formattedOuptut(6, 'File');
        resolve({ type: stats.isDirectory() ? 'Folder' : 'File', fileName: file, str: `|${formattedOuptut(maxLength, file)}|${dirOrFile}|` });
      });
    });
    arrLists.push(newPromise);
  });
  // Prepare body: sorting.
  const result = await Promise.allSettled(arrLists).then((data) => data.sort((a, b) => {
    // Compare folder and file types
    if (a.value.type !== b.value.type) {
      return a.value.type === 'Folder' ? -1 : 1;
    }
    // Compare file names.
    return a.value.fileName.toLowerCase().localeCompare(b.value.fileName.toLowerCase());
  }));

  // pring body of table.
  result.forEach((val, index) => {
    console.log(`|${formattedOuptut(7, index + 1)}${val.value.str}`);
  });
  // Print bottom of table.
  console.log(` ${'‾'.repeat(maxLength + 21)}`);
}
export default listFolder;
