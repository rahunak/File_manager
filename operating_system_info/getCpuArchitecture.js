import { arch } from 'os';

function getCpuArchitecture() {
  console.log('CPU architecture:', arch());
}
export default getCpuArchitecture;
