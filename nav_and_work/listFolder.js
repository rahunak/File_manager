import { readdir } from 'node:fs/promises';
import { stat } from 'node:fs';
import { formattedOuptut } from '../helpers.js';

/**
 * List all files and folders in the current directory in a table format.
 *
 * @return {Promise<void>} Promise representing the completion of the function
 */
async function listFolder() {
  // Reads current directory
  const files = await readdir(process.cwd());
  // Finds max length of word in folder.
  const maxLength = files.reduce((acc, curr) => {
    if (acc < curr.length) {
      return curr.length;
    }
    return acc;
  }, 0);
    // Print head of table
  console.log(` ${'_'.repeat(maxLength + 21)}`);
  console.log(`\x1b[7m|${`${formattedOuptut(7, '(index)')}|${formattedOuptut(maxLength, 'Name')}`}|${formattedOuptut(6, 'Type')}|\x1b[0m`);
  console.log(`|${'—'.repeat(maxLength + 21)}|`);
  // Prepare the body of table.
  const arrLists = [];
  files.forEach((file) => {
    const newPromise = new Promise((resolve) => {
      stat(file, (err, stats) => {
        if (err) {
          console.log(err);
          return;
        }
        const dirOrFileText = stats.isDirectory() ? formattedOuptut(6, 'Folder') : formattedOuptut(6, 'File');
        const dirOrFileColor = stats.isDirectory() ? '\x1b[32m' : '\x1b[33m';
        resolve({ type: stats.isDirectory() ? 'Folder' : 'File', fileName: file, str: `|${dirOrFileColor}${formattedOuptut(maxLength, file)}\x1b[0m|${dirOrFileColor}${dirOrFileText}\x1b[0m|` });
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

  // Pring body of table.
  result.forEach((val, index) => {
    console.log(`|${formattedOuptut(7, index + 1)}${val.value.str}`);
  });
  // Print bottom of table.
  console.log(` ${'‾'.repeat(maxLength + 21)}`);
}
export default listFolder;
