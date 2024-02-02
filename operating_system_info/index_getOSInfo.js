import getCPUArchitecture from './getCpuArchitecture.js';
import getCPUS from './getCPUS.js';
import getEOL from './getEOL.js';
import getHomedir from './getHomedir.js';
import getUsername from './getUsername.js';

function getOSInfo(arg) {
  switch (arg) {
    case '--EOL':
      getEOL();
      break;
    case '--cpus':
      getCPUS();
      break;
    case '--homedir':
      getHomedir();
      break;
    case '--username':
      getUsername();
      break;
    case '--architecture':
      getCPUArchitecture();
      break;
    default:
      console.log('Invalid input');
  }
}
export default getOSInfo;
