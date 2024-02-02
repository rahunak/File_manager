import { homedir } from 'os';

function getHomedir() {
  try {
    console.log('homedir:', homedir());
  }
  catch (error) {
    console.log('Invalid input');
  }
}
export default getHomedir;
