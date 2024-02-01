import path from 'path';
import os from 'os';

function changeDirectory(destination) {
  if (destination === undefined) {
    try {
      if (process.cwd() === os.homedir()) {
        return;
      }
      process.chdir(path.resolve(process.cwd(), '..'));
    }
    catch (err) {
      console.error('Operation failed');
    }
  }
  else {
    try {
      process.chdir(path.resolve(process.cwd(), destination));
    }
    catch (err) {
      console.error('Operation failed');
    }
  }
}
export default changeDirectory;
