import { userInfo } from 'os';

function getUsername() {
  try {
    console.log('username:', userInfo().username);
  }
  catch (error) {
    console.log('Invalid input: user has no username or homedir');
  }
}
export default getUsername;
