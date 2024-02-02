import zlib, { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream, stat } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';

async function compressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed');
    return;
  }
  async function brotliCompress(input, output) {
    let expectedInputSize = 0;
    await stat(pathToFile, (err, stats) => {
      expectedInputSize = stats.size;
    });
    // params uses for optimization
    const brotliStream = await createBrotliCompress({
      chunkSize: 32 * 1024,
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: expectedInputSize,
      },
    });

    const source = await createReadStream(input);
    const destination = await createWriteStream(output);
    await pipeline(source, brotliStream, destination);
  }

  try {
    // Use .br extension for Brotli compression
    const fileName = path.basename(pathToFile);
    await brotliCompress(pathToFile, path.join(pathToDestination, `${fileName}.br`));
  }
  catch (error) {
    console.error('Operation failed');
  }
}
export default compressFunc;
