import { cpus } from 'node:os';

// Get host machine CPUs info
// (overall amount of CPUS plus model and clock rate (in GHz)
// for each of them) and print it to console
function getCPUS() {
  const cpusArr = cpus();
  console.log('amount of CPUS:', cpusArr.length);
  cpusArr.forEach((cpu, index) => {
    console.log('№', index + 1, 'model:', cpu.model, ' clock rate:', cpu.speed, 'GHz');
  });
}
export default getCPUS;
