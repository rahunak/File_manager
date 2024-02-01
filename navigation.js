import path from 'path';

function changeDirectory(destination) {
  console.log('change directory', destination);
  if (destination === undefined) {
    process.chdir(path.resolve(process.cwd(), '..'));
  }
  else {
    process.chdir(path.resolve(process.cwd(), destination));
  }
}
export default changeDirectory;
