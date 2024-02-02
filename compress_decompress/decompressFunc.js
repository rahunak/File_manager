import zlib, { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';

async function decompressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed');
    return;
  }
  async function brotliDecompress(input, output) {
    const brotliUncompres = await createBrotliDecompress({
      chunkSize: 32 * 1024,
      params: {
        [zlib.constants.BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION]: true,
        [zlib.constants.BROTLI_DECODER_PARAM_LARGE_WINDOW]: true,
      },
    });

    const source = await createReadStream(input);
    const destination = await createWriteStream(output);
    await pipeline(source, brotliUncompres, destination);
  }

  try {
    let fileName = path.basename(pathToFile);
    if (path.basename(pathToFile).split('.').length > 2) {
      fileName = path.basename(pathToFile).split('.').slice(0, -1).join('.');
    }
    await brotliDecompress(pathToFile, path.join(pathToDestination, fileName));
  }
  catch (err) {
    console.error('Operation failed');
  }
}
export default decompressFunc;
