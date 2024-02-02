import zlib, { createGzip, createBrotliCompress } from 'node:zlib';
import fs, { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import path from 'path';

async function compressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed');
    return;
  }
  async function brotliCompress(input, output) {
    const pipe = promisify(pipeline);
    const gzip = createBrotliCompress({
      chunkSize: 32 * 1024,
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
        [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: fs.statSync(pathToFile).size,
      },
    });

    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }

  try {
    // Use .br extension for Brotli compression
    const fileName = path.basename(pathToFile);
    await brotliCompress(pathToFile, path.join(pathToDestination, `${fileName}.br`))
      .catch((err) => {
        console.error('An error occurred:', err);
        process.exitCode = 1;
      });
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default compressFunc;
