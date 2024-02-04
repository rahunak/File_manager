import { EOL } from 'os';

function getEOL() {
  console.log('EOL:', EOL === '\n' ? '\\n' : '\\r\\n');
}
export default getEOL;
